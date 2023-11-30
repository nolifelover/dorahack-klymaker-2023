// import { UuidService } from './../utils/uuid/uuid.service';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Role } from 'src/models/role.enum';
import { User } from 'src/models/user.interface';
import { UpdateUserInput } from './dto/update-user.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { FirebaseService } from 'src/utils/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly storageService: FirebaseService) {}

  async createUser(payload: CreateUserInput) {
    const user = await this.storageService.create('users', payload);
    return user;
  }

  async getUser(id: string) {
    const user = await this.storageService.get('users', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async getUsers(filter: any, order: any, page: number, limit: number) {
    const users = await this.storageService.paginate('users', filter, order, page, limit);
    return users;
  }

  async updateUser(id: string, payload: UpdateUserInput) {
    const data = {
      ...payload,
      updatedAt: new Date(),
    };
    let user = await this.storageService.get('users', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    user = await this.storageService.update('users', id, data);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.storageService.get('users', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    await this.storageService.delete('users', id);
    return true;
  }

  async getUserByPublicAddress(publicAddress: string): Promise<User> {
    const users = await this.storageService.gets('users', { publicAddress }, {}, {});
    let user: any;
    if (users.length == 0) {
      const payload = {
        id: publicAddress,
        publicAddress,
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      user = await this.storageService.create('users', payload);
    } else {
      user = users[0];
    }
    return user;
  }

  async randomUserNonce(id: string): Promise<number> {
    const nonce = Math.floor(Math.random() * 10000);
    Logger.debug(`random nonce ${nonce}`);
    await this.storageService.update('users', id, { nonce });
    return nonce;
  }

  async updateRole(id: string, role: Role): Promise<Role> {
    Logger.debug(`update role ${role}`);
    await this.storageService.update('users', id, { role });
    return role;
  }
}
