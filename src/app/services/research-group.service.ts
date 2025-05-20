import { Injectable } from '@angular/core';
import { ResearchGroup } from '../models/research-group.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchGroupService extends BaseService<ResearchGroup> {
  protected override endpoint = 'research-groups';
} 