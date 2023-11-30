import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { AuthService } from './auth.service';
import { FirebaseService } from 'src/utils/firebase/firebase.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    const firebaseUser = await this.firebaseService.auth.verifyIdToken(token, true).catch((err) => {
      throw new UnauthorizedException();
    });
    const user = this.authService.validateUser(firebaseUser.uid);
    return user;
  }
}
