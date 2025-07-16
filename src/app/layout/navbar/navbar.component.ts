import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ModuleSelectionService } from '../../services/module-selection.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showNavbar: boolean = true;
  showNotifications: boolean = false;

  notifications = [
    { id: 1, message: 'Sistema actualizado correctamente.', time: 'Hace 5 minutos' },
    { id: 2, message: 'Nuevo usuario registrado.', time: 'Hace 10 minutos' },
    { id: 3, message: 'Backup realizado con éxito.', time: 'Hace 1 hora' }
  ];

  constructor(
    private router: Router,
    private moduleSelectionService: ModuleSelectionService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = event.url !== '/login';
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

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

  logout() {
    this.router.navigate(['/login']);
  }
}
