import { Injectable } from '@angular/core';
import { Budget } from '../models/budget.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseService<Budget> {
  protected override endpoint = 'budgets';
} 