import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  protected override endpoint = 'users';
} 