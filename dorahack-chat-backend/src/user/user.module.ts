import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { FirebaseService } from 'src/utils/firebase/firebase.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { UuidService } from 'src/utils/uuid/uuid.service';

@Module({
  imports: [],
  providers: [UserService, FirebaseService, PaginationService, UuidService],
  controllers: [UsersController],
})
export class UsersModule {}
