import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Web3Storage, File } from 'web3.storage';

@Injectable()
export class Web3StorageService {
  async makeStorageClient() {
    const token = process.env.WEB3STORAGE_TOKEN;
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          errors: {
            message: 'Web3storage token not found in the environment.',
          },
        },
        HttpStatus.FORBIDDEN
      );
    }
    return new Web3Storage({ token });
  }
  async uploadToWeb3Storage(text: string, fileName: string) {
    const client = await this.makeStorageClient();
    const files = [new File([Buffer.from(text)], fileName, { type: 'text/plain' })];
    const cid = await client.put(files);
    return cid;
  }
}
