import { Injectable } from '@angular/core';
import { Program } from '../models/program.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService<Program> {
  protected override endpoint = 'programs';
} 