import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import { Role } from 'src/models/role.enum';

export class UpdateUserInput {
  @IsOptional()
  profileName: string;

  @IsOptional()
  @IsMobilePhone()
  mobilePhone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  profileImage: string;

  @IsOptional()
  role: Role;

  @IsOptional()
  nonce: number;
}
