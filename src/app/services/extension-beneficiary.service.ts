import { Injectable } from '@angular/core';
import { ExtensionBeneficiary } from '../models/extension-beneficiary.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ExtensionBeneficiaryService extends BaseService<ExtensionBeneficiary> {
  protected override endpoint = 'extension-beneficiaries';
} 