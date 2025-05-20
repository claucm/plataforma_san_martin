import { Injectable } from '@angular/core';
import { ProjectProduct } from '../models/project-product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectProductService extends BaseService<ProjectProduct> {
  protected override endpoint = 'project-products';
} 