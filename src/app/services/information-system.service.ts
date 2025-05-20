import { Injectable } from '@angular/core';
import { InformationSystem } from '../models/information-system.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InformationSystemService extends BaseService<InformationSystem> {
  protected override endpoint = 'information-systems';
} 