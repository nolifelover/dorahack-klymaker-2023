import { Role } from './role.enum';

export interface User {
  id: string;
  profileName?: string;
  email?: string;
  mobilePhone?: string;
  firstname?: string;
  lastname?: string;
  profileImage?: string;
  role: Role;

  isInitProfile?: boolean;
  isDeleted?: boolean;
  deletedDate?: Date;

  publicAddress: string;
  nonce?: number;

  lensId: string;

  createdAt: Date;
  updatedAt: Date;
}
