import { Project } from './project.model';

export interface ProjectProduct {
  id?: number;
  name: string;
  description?: string;
  deliveryDate?: Date;
  project?: Project;
  status?: number;
  createdAt?: Date;
} 