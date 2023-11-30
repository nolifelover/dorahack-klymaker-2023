import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { AuthController } from './auth.controller';
import { FirebaseService } from 'src/utils/firebase/firebase.service';
import { UserService } from 'src/user/user.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { UuidService } from 'src/utils/uuid/uuid.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig?.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    FirebaseService,
    UuidService,
    JwtService,
    ConfigService,
    PaginationService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
