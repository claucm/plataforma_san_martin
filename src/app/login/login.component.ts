import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
export class LoginComponent {
  email: string = '';
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

  signInWithGoogle(): void {
    this.authService.signInWithGoogle().then((user) => {
      if (user) {
        if (user.email === 'clau.cm77@gmail.com') {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.setItem('isAdmin', 'false');
        }
        this.router.navigate(['/dashboard']);
      }
    }).catch((error) => {
      console.error('Google sign-in error:', error);
      alert('Google sign-in failed. Please try again.');
    });
  }

  onSubmit(): void {
    if (this.email === 'clau.cm77@hotmail.com' && this.password === '12345678') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('user', JSON.stringify({ email: this.email, name: 'Admin User' }));
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password');
    }
  }
}
