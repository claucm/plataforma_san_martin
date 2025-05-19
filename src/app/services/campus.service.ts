import { Injectable } from '@angular/core';
import { Campus } from '../models/campus.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CampusService extends BaseService<Campus> {
  protected override endpoint = 'campuses';
} 