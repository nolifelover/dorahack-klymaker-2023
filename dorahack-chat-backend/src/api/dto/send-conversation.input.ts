import { IsOptional } from 'class-validator';
import { ConversationMessageType } from 'src/models/conversation-message.interface';

export class SendConversationInput {
  @IsOptional()
  text: string;

  @IsOptional()
  contentType: ConversationMessageType;

  @IsOptional()
  optional?: object;
}
