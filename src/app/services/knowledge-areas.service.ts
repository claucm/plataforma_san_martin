import { Injectable } from '@angular/core';
import { KnowledgeAreas } from '../models/knowledge-areas.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeAreasService extends BaseService<KnowledgeAreas> {
  protected override endpoint = 'knowledge-areas';
} 