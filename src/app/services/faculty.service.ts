import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyService extends BaseService<Faculty> {
  protected override endpoint = 'faculties';
} 