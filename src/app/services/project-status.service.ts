import { Injectable } from '@angular/core';
import { ProjectStatus } from '../models/project-status.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService extends BaseService<ProjectStatus> {
  protected override endpoint = 'project-statuses';
} 