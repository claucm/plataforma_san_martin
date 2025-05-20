import { ProjectStatus } from './project-status.model';
import { CostCenter } from './cost-center.model';
import { ProjectType } from './project-type.model';
import { ResearchGroup } from './research-group.model';

export interface Project {
  id?: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status?: ProjectStatus;
  costCenter?: CostCenter;
  projectType?: ProjectType;
  researchGroup?: ResearchGroup;
  createdAt?: Date;
} 