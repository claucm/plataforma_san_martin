import { Injectable } from '@angular/core';
import { Submodule } from '../models/submodule.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService extends BaseService<Submodule> {
  protected override endpoint = 'submodules';
} 