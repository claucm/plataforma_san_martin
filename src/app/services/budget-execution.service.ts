import { Injectable } from '@angular/core';
import { BudgetExecution } from '../models/budget-execution.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetExecutionService extends BaseService<BudgetExecution> {
  protected override endpoint = 'budget-executions';
} 