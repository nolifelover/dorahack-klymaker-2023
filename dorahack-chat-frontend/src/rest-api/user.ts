import axios from '../helper/axios';
import environment from '../environment';
import { User } from '../type/auth';

export async function getUserInfoApi(): Promise<User | undefined> {
  const url = `${environment.apiUrl}/api/users/me`;
  const { data } = await axios.get(url);
  return data;
}
