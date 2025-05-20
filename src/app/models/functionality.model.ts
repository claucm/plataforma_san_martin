import { Submodule } from './submodule.model';

export interface Functionality {
  id?: number;
  name: string;
  description?: string;
  route?: string;
  submodule?: Submodule;
  status?: number;
  createdAt?: Date;
} 