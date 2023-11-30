import { IsNotEmpty } from 'class-validator';

export class AuthenticationPubliAddressInput {
  @IsNotEmpty()
  publicAddress: string;
  @IsNotEmpty()
  signature: string;
}
