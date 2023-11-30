import { IsNotEmpty } from 'class-validator';

export class SigninPublicAddressInput {
  @IsNotEmpty()
  publicAddress: string;
}
