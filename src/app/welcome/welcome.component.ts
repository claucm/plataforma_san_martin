import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleSelectionService } from '../services/module-selection.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private moduleSelectionService: ModuleSelectionService
  ) {}

  navigateTo(route: string): void {
    if (route === 'login') {
      // Open SGD link in new tab
      window.open('https://fusm.sanmartin.edu.co/', '_blank');
      return;
    }

    // Map route keys to actual routes
    let actualRoute = route;
    if (route === 'investigacion') {
      actualRoute = '/apertura-convocatoria';
    } else if (route === 'extension') {
      actualRoute = '/modulo-extension';
    }

    // Set selected module for sidebar filtering
    this.moduleSelectionService.setSelectedModule(route);

    // Navigate to route
    this.router.navigate([actualRoute]);
  }
}