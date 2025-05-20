import { Project } from './project.model';
import { BudgetStatus } from './budget-status.model';

export interface Budget {
  id?: number;
  amount: number;
  description?: string;
  project?: Project;
  status?: BudgetStatus;
  createdAt?: Date;
} 