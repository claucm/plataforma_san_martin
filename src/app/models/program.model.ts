import { Faculty } from './faculty.model';

export interface Program {
  id?: number;
  name: string;
  code?: string;
  faculty?: Faculty;
  status?: number;
  createdAt?: Date;
} 