import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    const url: string = state.url;

    const isAdmin = this.authService.isAdmin();
    const isInvestigador = this.authService.isInvestigador();

    // If admin, allow all routes
    if (isAdmin) {
      return true;
    }

    // If investigador, restrict routes
    if (isInvestigador) {
      // Allowed routes for investigador
      const allowedRoutes = [
        '/convocatorias',
        '/registro-proyecto',
        '/investigacion/reportes-notificaciones',
        '/tablero-indicadores/investigacion',
        '/welcome',
        '/login'
      ];

      // Check if the requested url starts with any allowed route
      const allowed = allowedRoutes.some(routePath => url.startsWith(routePath));

      if (allowed) {
        return true;
      } else {
        // Redirect to welcome or allowed page if unauthorized
        return this.router.parseUrl('/welcome');
      }
    }

    // Default deny access
    return this.router.parseUrl('/login');
  }
}
