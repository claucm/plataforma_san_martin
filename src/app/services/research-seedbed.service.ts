import { Injectable } from '@angular/core';
import { ResearchSeedbed } from '../models/research-seedbed.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchSeedbedService extends BaseService<ResearchSeedbed> {
  protected override endpoint = 'research-seedbeds';
} 