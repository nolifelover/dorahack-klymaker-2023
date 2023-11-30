import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UuidService {
  async generateUuid() {
    const uniqueToken = uuid.v4();
    return uniqueToken;
  }

  async makeCode(length: number) {
    let result = '';
    const characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
