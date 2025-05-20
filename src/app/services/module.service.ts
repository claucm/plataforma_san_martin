import { Injectable } from '@angular/core';
import { Module } from '../models/module.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseService<Module> {
  protected override endpoint = 'modules';
} 