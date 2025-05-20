import { Faculty } from './faculty.model';
import { ResearchGroup } from './research-group.model';

export interface ResearchSeedbed {
  id?: number;
  name: string;
  code?: string;
  faculty?: Faculty;
  researchGroup?: ResearchGroup;
  status?: number;
  createdAt?: Date;
} 