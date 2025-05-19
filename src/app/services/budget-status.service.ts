import { Injectable } from '@angular/core';
import { BudgetStatus } from '../models/budget-status.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetStatusService extends BaseService<BudgetStatus> {
  protected override endpoint = 'budget-statuses';
} 