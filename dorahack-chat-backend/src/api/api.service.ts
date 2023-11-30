import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { ConversationMessageType } from 'src/models/conversation-message.interface';
import { ConversationType } from 'src/models/conversation.interface';
import { FirebaseService } from 'src/utils/firebase/firebase.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { UuidService } from 'src/utils/uuid/uuid.service';

@Injectable()
export class ApiService {
  constructor(
    private storageService: FirebaseService,
    private uuid: UuidService,
    private readonly paginationService: PaginationService
  ) {}

  // User
  async getUserById(id: string) {
    const user = await this.storageService.get('users', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'user not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async updateUser(id: string, payload: any) {
    const data = {
      ...payload,
      updatedAt: new Date(),
    };
    let user = await this.storageService.get('users', id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    user = await this.storageService.update('users', id, data);
    return user;
  }

  async createContact(payload: any) {
    const { ownerUserId, address } = payload;
    let contact: any;
    if (ownerUserId == address) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            message: 'Not allow to contact with yourself',
          },
        },
        HttpStatus.CONFLICT
      );
    }
    const contacts = await this.storageService.gets('contacts', { ownerUserId, address }, {}, { limit: 1 });
    if (contacts.length == 0) {
      contact = await this.storageService.create('contacts', payload);
    } else {
      contact = contacts[0];
    }
    return contact;
  }

  async getContactListByUserId(userId: string, page: number, limit: number) {
    const contacts = await this.storageService.paginate(
      'contacts',
      { ownerUserId: userId },
      { createdAt: 'desc' },
      page,
      limit
    );
    return contacts;
  }

  async getContactByUserIdAndContactId(userId: string, contactId: string) {
    const contact = await this.storageService.get('contacts', contactId);
    if (!contact) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Contact not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    if (userId !== contact.ownerUserId) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Contact not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return contact;
  }

  async isParticipant(conversationId: string, userId: string) {
    const conversation = await this.storageService.get('conversations', conversationId);
    if (!conversation) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: 'Conversation not found',
          },
        },
        HttpStatus.NOT_FOUND
      );
    }

    const findUserInConversation = await _.find(conversation.participants, function (o) {
      return o.id == userId;
    });
    if (!findUserInConversation) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            message: 'Not allow to send this conversation',
          },
        },
        HttpStatus.CONFLICT
      );
    }
    return conversation;
  }

  async findOrCreateConversation(payload: any) {
    const { type, participantIds } = payload;
    let conversation: any;
    switch (type) {
      case ConversationType.GROUP:
        break;
      case ConversationType.NEGO:
        break;
      case ConversationType.PAGE:
        break;
      case ConversationType.DM:
      default:
        const participants = [];
        for (const participantId of participantIds) {
          const user = await this.storageService.get('users', participantId);
          const participant = {
            id: user.id,
            publicAddress: user.publicAddress,
          };
          participants.push(participant);
        }
        const conversations = await this.storageService.gets(
          'conversations',
          {
            type,
            participants: participants,
          },
          {},
          {}
        );
        if (conversations.length == 0) {
          conversation = await this.storageService.create('conversations', { type, participants });
        } else {
          conversation = conversations[0];
        }
        break;
    }
    return conversation;
  }

  async getConversation(userId: string, conversationId: string) {
    const conversationPaticipatns = await this.isParticipant(conversationId, userId);
    const conversation = await this.storageService.get('conversations', conversationId);
    return { participants: conversationPaticipatns.participants, conversation };
  }

  async getConversationListByUserId(userId: string, page: number, limit: number) {
    const user = await this.storageService.get('users', userId);
    const participant = {
      id: user.id,
      publicAddress: user.publicAddress,
    };

    const conversations = await this.storageService.paginate(
      'conversations',
      { participants: { symbol: 'array-contains', value: participant } },
      { updatedAt: 'desc' },
      page,
      limit
    );
    for (const conversation of conversations.results) {
      const messages = await this.storageService.gets(
        'conversation-messages',
        { conversationId: conversation.id },
        { createdAt: 'desc' },
        { limit: 1 }
      );
      let latestMessage = null;
      if (messages.length > 0) {
        latestMessage = messages[0];
        latestMessage.content = await this.storageService.fecthTextURL(latestMessage.content);
      }
      const participants = [];
      for (const participant of conversation.participants) {
        const user = await this.storageService.get('users', participant.id);
        delete user.nonce;
        participants.push(user);
      }
      delete conversation.messages;
      Object.assign(conversation, { latestMessage, participants });
    }
    return conversations;
  }

  async sendConversation(payload) {
    const { conversationId, senderId } = payload;
    const conversation = await this.isParticipant(conversationId, senderId);
    const conversationMessage = await this.storageService.create('conversation-messages', payload);
    await this.storageService.update('conversations', conversationId, { updatedAt: new Date() });

    // Update realtime
    for (const participant of conversation.participants) {
      if (participant.id !== senderId) {
        Logger.debug(`sending push to ${participant.id}`);
        await this.storageService.saveOrUpdateRealTime(`${participant.id}/latestMessage`, conversationMessage);
      }
    }

    return conversationMessage;
  }

  async getConversationMessages(userId: string, conversationId: string, page: number, limit: number) {
    const conversation = await this.isParticipant(conversationId, userId);
    const conversationMessages = await this.storageService.paginate(
      'conversation-messages',
      { conversationId },
      { createdAt: 'desc' },
      page,
      limit
    );
    for (const [key, conversation] of Object.entries(conversationMessages.results)) {
      if (conversation.content !== null) {
        const content = await this.storageService.fecthTextURL(conversation.content);
        conversationMessages.results[key].content = content;
      }
    }
    return { participants: conversation.participants, conversationMessages };
  }

  async getMediaConversation(
    userId: string,
    conversationId: string,
    contentType: ConversationMessageType,
    page: number,
    limit: number
  ) {
    await this.isParticipant(conversationId, userId);
    const conversationMessages = await this.storageService.paginate(
      'conversation-messages',
      { conversationId, contentType },
      { createdAt: 'desc' },
      page,
      limit
    );
    for (const [key, conversation] of Object.entries(conversationMessages.results)) {
      if (conversation.content !== null) {
        const content = await this.storageService.fecthTextURL(conversation.content);
        const data = {
          content,
          optional: conversation.optional,
        };
        conversationMessages.results[key] = data;
      }
    }
    return conversationMessages;
  }
}
