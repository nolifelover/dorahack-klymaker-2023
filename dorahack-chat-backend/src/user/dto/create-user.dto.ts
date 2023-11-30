import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/models/role.enum';

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  publicAddress: string;

  @IsNotEmpty()
  @IsString()
  profileName: string;

  @IsNotEmpty()
  @IsMobilePhone()
  mobilePhone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  profileImage: string;

  @IsNotEmpty()
  @IsString()
  role: Role;

  @IsNotEmpty()
  @IsNumber()
  nonce: number;
}
