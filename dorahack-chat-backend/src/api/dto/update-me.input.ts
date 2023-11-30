import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';

export class UpdateMeInput {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsMobilePhone()
  mobilePhone: string;

  @IsOptional()
  title: string;

  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  nickname: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  age: number;

  @IsOptional()
  picture: string;
}
