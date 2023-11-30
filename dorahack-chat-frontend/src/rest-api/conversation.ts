import axios from '../helper/axios';
import environment from '../environment';
import {
  Conversation,
  ConversationWithPageInfo,
  ConversationWithParticipants,
} from '../type/conversation';
import {
  Message,
  MessageStateOptional,
  MessageType,
  MessageWithParticipant,
} from '../type/message';
import { MediaContentWithPageInfo } from '../type/message-media';

export async function requestConversationApi(
  userIds: string[]
): Promise<Conversation | undefined> {
  const url = `${environment.apiUrl}/api/chats/conversations/request`;
  const { data } = await axios.post(url, { userIds });
  return data;
}

export async function getConversationApi(
  conversationId: string
): Promise<ConversationWithParticipants | undefined> {
  const url = `${environment.apiUrl}/api/chats/conversation/${conversationId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getConversationsApi(
  query: string
): Promise<ConversationWithPageInfo | undefined> {
  const url = `${environment.apiUrl}/api/chats/conversations/me${query}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getMessagesApi(
  conversationId: string,
  query: string
): Promise<MessageWithParticipant | undefined> {
  const url = `${environment.apiUrl}/api/chats/conversations/${conversationId}${query}`;
  const { data } = await axios.get(url);
  return data;
}

export async function sendTextMessageApi(
  conversationId: string,
  text: string,
  contentType: MessageType,
  optional: MessageStateOptional
): Promise<Message[] | undefined> {
  const url = `${environment.apiUrl}/api/chats/conversations/${conversationId}/send`;
  const { data } = await axios.post(url, { text, contentType, optional });
  return data;
}

export async function getCoversationMediaApi(
  conversationId: string,
  contentType: MessageType,
  query: string
): Promise<MediaContentWithPageInfo | undefined> {
  const url = `${environment.apiUrl}/api/chats/media/conversations/${conversationId}${query}&contentType=${contentType}`;
  const { data } = await axios.get(url);
  return data;
}

export async function updateLensProfile(lensId: string) {
  const url = `${environment.apiUrl}/api/users/me`;
  const { data } = await axios.patch(url, { lensId });
  return data;
}
