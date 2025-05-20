import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '9212672160-eibjml34qtmi4rcsjonvv0c2qhk17e30.apps.googleusercontent.com';
  private _user = signal<any>(null);
  private _isLoggedIn = signal<boolean>(false);
  private _isAdmin = signal<boolean>(false);

  // Exponer las signals como señales de solo lectura
  user = this._user.asReadonly();
  isLoggedIn = this._isLoggedIn.asReadonly();
  isAdmin = this._isAdmin.asReadonly();

  private googleScriptLoaded: Promise<void>;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Efecto para redirigir cuando el estado de autenticación cambie
    effect(() => {
      if (this._isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.googleScriptLoaded = this.loadGoogleScript();
    } else {
      this.googleScriptLoaded = Promise.resolve();
    }
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }
      if (document.getElementById('google-client-script')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-client-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.initializeGoogleAuth();
        resolve();
      };
      script.onerror = () => reject(new Error('Google script load error'));
      document.head.appendChild(script);
    });
  }

  private initializeGoogleAuth(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }

  private handleCredentialResponse(response: any): void {
    if (response.credential) {
      const user = this.decodeJWT(response.credential);
      this._user.set(user);
      this._isLoggedIn.set(true);
      if (user.email && user.email.toLowerCase() === 'claudia.manrique@sanmartin.edu.co') {
        this._isAdmin.set(true);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isAdmin', 'true');
        }
      } else {
        this._isAdmin.set(false);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isAdmin', 'false');
        }
      }
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('google_token', response.credential);
      }
    }
  }

  private decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  async renderLoginButton(elementId: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    await this.googleScriptLoaded;
    google.accounts.id.renderButton(
      document.getElementById(elementId),
      { theme: 'filled_blue', size: 'large', text: 'continue_with', shape: 'rectangular' }
    );
  }

  signOut(): void {
    this._user.set(null);
    this._isLoggedIn.set(false);
    this._isAdmin.set(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('google_token');
      localStorage.removeItem('isAdmin');
    }
    google.accounts.id.disableAutoSelect();
  }
}
