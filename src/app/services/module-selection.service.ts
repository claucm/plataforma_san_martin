import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleSelectionService {
  private selectedModuleSubject = new BehaviorSubject<string | null>(null);
  selectedModule$ = this.selectedModuleSubject.asObservable();

  setSelectedModule(module: string | null) {
    this.selectedModuleSubject.next(module);
  }
}
