import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<Project> {
  protected override endpoint = 'projects';
} 