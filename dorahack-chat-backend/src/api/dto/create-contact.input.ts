import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactInput {
  @IsNotEmpty()
  address: string;

  @IsOptional()
  reason: string;

  @IsOptional()
  description: string;
}
