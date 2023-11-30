import { IsOptional } from 'class-validator';

export class GetContactDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
