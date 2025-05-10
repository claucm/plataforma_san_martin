import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authInstance: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadGoogleAuth();
    }
  }

  private loadGoogleAuth() {
    gapi.load('auth2', () => {
      this.authInstance = gapi.auth2.init({
        client_id: '845177984810-kimct6g8ptejt7qfq97s55unbgvea46j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  signInWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isBrowser) {
        reject('Not running in browser');
        return;
      }
      if (!this.authInstance) {
        reject('Google Auth SDK not loaded');
        return;
      }
      this.authInstance.signIn().then((googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        const user = {
          id: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          imageUrl: profile.getImageUrl(),
          idToken: googleUser.getAuthResponse().id_token
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!localStorage.getItem('user');
  }

  isAdmin(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return localStorage.getItem('isAdmin') === 'true';
  }

  signOut(): void {
    if (!this.isBrowser) {
      return;
    }
    if (this.authInstance) {
      this.authInstance.signOut().then(() => {
        localStorage.removeItem('user');
      });
    } else {
      localStorage.removeItem('user');
    }
  }
}
