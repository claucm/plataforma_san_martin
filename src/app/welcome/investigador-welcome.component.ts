import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investigador-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investigador-welcome.component.html',
  styleUrls: ['./investigador-welcome.component.css']
})
export class InvestigadorWelcomeComponent {
  constructor(private router: Router) {}

  goToInvestigacion() {
    this.router.navigate(['/convocatorias']);
  }

  goToTablero() {
    this.router.navigate(['/tablero-indicadores/investigacion']);
  }

  navigateTo(page: string) {
    if (page === 'investigacion') {
      this.router.navigate(['/convocatorias']);
    } else if (page === 'tablero') {
      this.router.navigate(['/tablero-indicadores/investigacion']);
    } else {
      // Default or fallback route
      this.router.navigate(['/']);
    }
  }
}
