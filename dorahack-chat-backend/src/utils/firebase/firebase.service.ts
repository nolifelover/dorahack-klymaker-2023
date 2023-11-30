import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { ConfigService } from '@nestjs/config';
import { UuidService } from '../uuid/uuid.service';
import { PaginationService } from '../pagination/pagination.service';
import { CommonStorageService } from '../common-storage-service.interface';

@Injectable()
export class FirebaseService implements CommonStorageService {
  public firestore: admin.firestore.Firestore;
  public auth: any;
  public firebaseAuth: any;
  public storage: any;
  public database: any;

  constructor(
    private configService: ConfigService,
    private readonly paginationService: PaginationService,
    private readonly uuidService: UuidService
  ) {
    this.firestore = admin.firestore();
    this.auth = admin.auth();
    this.database = admin.database();
    /* const firebaseConfigPath = process.env.GOOGLE_FIREBASE_CONFIG;
    const firebaseConfig = require(firebaseConfigPath); */

    const firebaseConfig = {
      apiKey: process.env.FIREBASECLIENT_APIKEY,
      authDomain: process.env.FIREBASECLIENT_AUTHDOMAIN,
      projectId: process.env.FIREBASECLIENT_PROJECTID,
      storageBucket: process.env.FIREBASECLIENT_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASECLIENT_MESSAGINGSENDERID,
      appId: process.env.FIREBASECLIENT_APPID,
      measurementId: process.env.FIREBASECLIENT_MEASUREMENTID,
    } as FirebaseOptions;
    const app = initializeApp(firebaseConfig);
    this.firebaseAuth = getAuth(app);

    this.storage = getStorage(app);
  }

  async create(collectionName: string, payload: any) {
    if (!payload.id) {
      const id = await this.uuidService.generateUuid();
      Object.assign(payload, { id });
    }
    const data = {
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = payload.id;
    const collections = this.firestore.collection(`${collectionName}`);
    await collections.doc(id).set(data);
    const result = await collections.doc(id).get();
    return result.data();
  }

  async update(collectionName: string, id: string, payload: any) {
    const collections = this.firestore.collection(`${collectionName}`);
    const collection = await collections.doc(id).get();
    if (!collection.exists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Collection not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    await collections.doc(id).update(payload);
    const result = await collections.doc(id).get();
    return result.data();
  }

  async delete(collectionName: string, id: string) {
    const collections = this.firestore.collection(`${collectionName}`);
    const collection = await collections.doc(id).get();
    if (!collection.exists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Collection not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    await collections.doc(id).delete();
    return true;
  }

  async paginate(collectionName: string, filter: any, order: any, page: number, limit: number) {
    const collections = this.firestore.collection(`${collectionName}`);
    let query: any = collections;
    for (const [key, value] of Object.entries(filter)) {
      if (value['symbol']) {
        query = query.where(key, value['symbol'], value['value']);
      } else {
        query = query.where(key, '==', value);
      }
    }
    for (const [key, value] of Object.entries(order)) {
      query = query.orderBy(key, value);
    }
    const collectionDatas = await query.get();
    const datas = [];
    for (const doc of collectionDatas.docs) {
      const u = doc.data();
      datas.push(u);
    }
    const result = {
      results: [],
      page: Number.parseInt(`${page}`),
      limit: Number.parseInt(`${limit}`),
      totalPages: 0,
      totalResults: 0,
    };
    const totalResults = datas.length;
    const totalPages = Math.ceil(totalResults / limit);
    result.totalResults = totalResults;
    result.totalPages = totalPages;
    result.results = await this.paginationService.paginate(datas, limit, page);
    return result;
  }

  async gets(collectionName: string, filter: any, order: any, options: any) {
    const collections = this.firestore.collection(`${collectionName}`);
    let query: any = collections;
    for (const [key, value] of Object.entries(filter)) {
      if (value['symbol']) {
        query = query.where(key, `${value['symbol']}`, value['value']);
      } else {
        query = query.where(key, '==', value);
      }
    }

    for (const [key, value] of Object.entries(order)) {
      query = query.orderBy(key, value);
    }

    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case 'limit':
          query = query.limit(value);
          break;
        default:
          break;
      }
    }

    const collectionDatas = await query.get();
    const datas = [];
    for (const doc of collectionDatas.docs) {
      const u = doc.data();
      datas.push(u);
    }
    return datas;
  }

  async get(collectionName: string, id: string) {
    const collections = this.firestore.collection(`${collectionName}`);
    const collection = await collections.doc(id).get();
    if (!collection.exists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Collection not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return collection.data();
  }

  async saveOrUpdateRealTime(refString: string, payload: any) {
    const db = this.database;
    const ref = db.ref(`${refString}`);
    await ref.set(payload);
  }

  async uploadFile(prefix: string, file: Express.Multer.File) {
    const { originalname } = file;
    const storageRef = ref(this.storage, `${prefix}/${originalname}`);

    const metadata = {
      contentType: `${file.mimetype}`,
    };
    try {
      const uploadTask = await uploadBytes(storageRef, file.buffer, metadata);
      const downloadTask = await getDownloadURL(ref(this.storage, `${uploadTask.metadata.fullPath}`));
      return downloadTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: error._baseMessage,
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async uploadText(prefix: string, text: string, fileName: string) {
    const storageRef = ref(this.storage, `${prefix}/${fileName}`);

    const metadata = {
      contentType: 'text/plain',
    };
    try {
      const uploadTask = await uploadBytes(storageRef, Buffer.from(text), metadata);
      const downloadTask = await getDownloadURL(ref(this.storage, `${uploadTask.metadata.fullPath}`));
      return downloadTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: error._baseMessage,
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async fecthTextURL(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: 'Network response was not ok',
            },
          },
          HttpStatus.BAD_REQUEST
        );
      }
      const textContent = await response.text();
      return textContent;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: 'There was a problem with the fetch operation: ' + error,
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async generateSignedUrl(filename: string): Promise<string> {
    const bucket = admin.storage().bucket(ref(this.storage).bucket);

    const cors = [
      {
        origin: ['*'],
        method: ['*'],
        responseHeader: ['Content-Type'],
        maxAgeSeconds: 3600,
      },
    ];
    const metadata = { cors };
    bucket.setMetadata(metadata);

    const options: any = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000,
    };

    const [url] = await bucket.file(filename).getSignedUrl(options);
    return url;
  }

  async downloadFile(path: string) {
    try {
      const downloadTask = await getDownloadURL(ref(this.storage, `${path}`));
      return downloadTask;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: error._baseMessage,
          },
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async deleteFile(path: string) {
    try {
      await deleteObject(ref(this.storage, `${path}`));
    } catch (error) {}
  }
}
