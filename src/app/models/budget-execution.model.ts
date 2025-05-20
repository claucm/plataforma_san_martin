import { Budget } from './budget.model';

export interface BudgetExecution {
  id?: number;
  amount: number;
  executionDate: Date;
  description?: string;
  budget?: Budget;
  status?: number;
  createdAt?: Date;
} 