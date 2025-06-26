import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes-notificaciones',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Reportes y Notificaciones</h1>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" routerLink="generacion-reportes" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Generación de Reportes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="notificaciones" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Notificaciones</a>
      </li>
    </ul>
    <div class="tab-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    h1 {
      color: #0a2e4c;
      text-align: center;
      margin-bottom: 20px;
    }
    .nav-tabs {
      display: flex;
      border-bottom: 1px solid #dee2e6;
      margin-bottom: 20px;
      justify-content: center;
      background-color: transparent;
    }
    .nav-item {
      margin: 0 10px;
    }
    .nav-link {
      display: block;
      padding: 0.5rem 1rem;
      color: #0a2e4c;
      text-decoration: none;
      border: 1px solid transparent;
      border-bottom: none;
      cursor: pointer;
      font-weight: 600;
      border-radius: 0.25rem 0.25rem 0 0;
      transition: background-color 0.3s ease;
      background-color: transparent;
    }
    .nav-link:hover {
      background-color: #e9ecef;
    }
    .nav-link.active {
      color: white;
      background-color: #0a2e4c;
      border-color: #0a2e4c #0a2e4c transparent;
      cursor: default;
    }
    .tab-content {
      padding: 10px;
      border: 1px solid #dee2e6;
      border-radius: 0 0 0.25rem 0.25rem;
      background-color: transparent;
      max-width: 900px;
      margin: 0 auto;
    }
  `]
})
export class ReportesNotificacionesComponent {}
