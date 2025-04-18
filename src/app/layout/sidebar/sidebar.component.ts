import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isDarkMode: boolean = false;
  expandedMenus: { [key: string]: boolean } = {};
  userRole: string = 'admin';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      }
    }
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      localStorage.setItem('darkMode', this.isDarkMode.toString());
    }
  }

  toggleMenu(menuId: string) {
    this.expandedMenus[menuId] = !this.expandedMenus[menuId];
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus[menuId] || false;
  }

  hasPermission(route: string): boolean {
    // Aquí implementarías la lógica de permisos según el rol del usuario
    return true; // Por ahora retorna true para todas las rutas
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
