import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninPublicAddressInput } from './dto/singin-public-address.input';
import { AuthenticationPubliAddressInput } from './dto/auth-public-address.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('mock-signin')
  async mockSignIn(@Body() body: SigninPublicAddressInput) {
    const result = await this.authService.mockSignIn(body);
    return result;
  }

  @Post('signin/public-address')
  async singinWithPublicAddress(@Body() body: SigninPublicAddressInput) {
    const result = await this.authService.singinWithPublicAddress(body);
    return result;
  }

  @Post('using/public-address')
  async authenticationWithPublicAddress(@Body() body: AuthenticationPubliAddressInput) {
    const result = await this.authService.authenticationWithPublicAddress(body);
    return result;
  }
}
