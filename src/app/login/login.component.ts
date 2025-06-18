import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cedula: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Clear user and isAdmin on login component init to show login form
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
    }
  }

  ngOnInit(): void {
    // Removed Google login rendering
  }

  signInWithGoogle(): void {
    // No longer needed since button is removed
  }

  onSubmit(): void {
    const success = this.authService.loginManual(this.cedula, this.password);
    if (!success) {
      alert('Cédula o contraseña inválidos');
    }
  }

  forgotPassword(): void {
    alert('Funcionalidad de recuperación de contraseña no implementada.');
  }
}
