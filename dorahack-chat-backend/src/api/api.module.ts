import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { FirebaseService } from 'src/utils/firebase/firebase.service';
import { UuidService } from 'src/utils/uuid/uuid.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Web3StorageService } from 'src/utils/web3storage/web3storage.service';
import { ConfigService } from 'aws-sdk';

@Module({
  controllers: [ApiController],
  providers: [ApiService, FirebaseService, UuidService, PaginationService, Web3StorageService, ConfigService],
})
export class ApiModule {}
