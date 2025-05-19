import { Permission } from './permission.model';

export interface Role {
  id?: number;
  name: string;
  description?: string;
  status?: number;
  createdAt?: Date;
  permissions?: Permission[];
} 