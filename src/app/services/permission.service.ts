import { Injectable } from '@angular/core';
import { Permission } from '../models/permission.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService<Permission> {
  protected override endpoint = 'permissions';
} 