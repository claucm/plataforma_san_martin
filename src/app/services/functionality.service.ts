import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService extends BaseService<Functionality> {
  protected override endpoint = 'functionalities';
} 