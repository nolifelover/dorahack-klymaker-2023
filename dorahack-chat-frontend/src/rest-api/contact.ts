import axios from '../helper/axios';
import environment from '../environment';
import {
  Contact,
  ContactWithPageInfo,
  CreateContactBody,
} from '../type/contact';

export async function createContactApi(
  body: CreateContactBody
): Promise<Contact | undefined> {
  const url = `${environment.apiUrl}/api/contacts`;
  const { data } = await axios.post(url, body);
  return data;
}

export async function getContactsApi(
  query: string
): Promise<ContactWithPageInfo | undefined> {
  const url = `${environment.apiUrl}/api/contacts${query}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getContactApi(
  contactId: string
): Promise<Contact | undefined> {
  const url = `${environment.apiUrl}/api/contacts/${contactId}`;
  const { data } = await axios.get(url);
  return data;
}
