import { Role } from './role.model';

export interface User {
  id?: number;
  first_name: string;
  middle_name?: string;
  lastname: string;
  email: string;
  phone?: string;
  status?: number;
  createdAt?: Date;
  roles?: Role[];
}
