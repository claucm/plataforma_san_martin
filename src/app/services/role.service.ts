import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {
  protected override endpoint = 'roles';
} 