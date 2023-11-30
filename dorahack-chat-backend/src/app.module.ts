import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';
import config from 'src/common/configs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { FirebaseService } from './utils/firebase/firebase.service';
import { ApiModule } from './api/api.module';
import { UuidService } from './utils/uuid/uuid.service';
import { PaginationService } from './utils/pagination/pagination.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UsersModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, FirebaseService, UuidService, PaginationService],
})
export class AppModule {}
