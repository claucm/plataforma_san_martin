import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormsModule } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.renderLoginButton('google-signin-button');
    }
  }

  signInWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      google.accounts.id.prompt();
    }
  }

  // Removed onSubmit method
}
