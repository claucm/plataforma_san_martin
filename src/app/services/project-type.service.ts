import { Injectable } from '@angular/core';
import { ProjectType } from '../models/project-type.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService extends BaseService<ProjectType> {
  protected override endpoint = 'project-types';
} 