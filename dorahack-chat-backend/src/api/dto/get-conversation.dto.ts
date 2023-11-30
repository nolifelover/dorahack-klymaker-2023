import { IsOptional } from 'class-validator';
import { ConversationMessageType } from 'src/models/conversation-message.interface';

export class GetConversationDto {
  @IsOptional()
  contentType?: ConversationMessageType;

  @IsOptional()
  page: number;

  @IsOptional()
  limit?: number;
}
