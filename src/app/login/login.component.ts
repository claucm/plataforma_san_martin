import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormsModule } from '@angular/forms';

declare var grecaptcha: any;

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
  captchaToken: string | null = null;
  recaptchaWidgetId: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Clear user and isAdmin on login component init to show login form
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');

      // Render the reCAPTCHA widget
      this.recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
        sitekey: '6LdC3YUrAAAAAO2XFurbg6qAmJ1Bz1fGOcH59nzU',
        callback: (response: string) => {
          this.captchaToken = response;
        },
        'expired-callback': () => {
          this.captchaToken = null;
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.captchaToken) {
      alert('Por favor, complete el captcha antes de iniciar sesión.');
      return;
    }
    const success = this.authService.loginManual(this.cedula, this.password);
    if (!success) {
      alert('Cédula o contraseña inválidos');
    } else {
      if (this.cedula === '123456789') {
        this.router.navigate(['/welcome-investigador']);
      } else {
        this.router.navigate(['/welcome']);
      }
    }
  }

  forgotPassword(): void {
    alert('Funcionalidad de recuperación de contraseña no implementada.');
  }
}
