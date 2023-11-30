import { IsOptional } from 'class-validator';

export class GetMyConversationDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
