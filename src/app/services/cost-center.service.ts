import { Injectable } from '@angular/core';
import { CostCenter } from '../models/cost-center.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService extends BaseService<CostCenter> {
  protected override endpoint = 'cost-centers';
} 