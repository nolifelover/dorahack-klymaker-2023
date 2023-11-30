import { IsNotEmpty, IsOptional } from 'class-validator';
import { ConversationType } from 'src/models/conversation.interface';

export class CreateConversationInput {
  @IsNotEmpty()
  userIds: string[];

  @IsOptional()
  type: ConversationType;
}
