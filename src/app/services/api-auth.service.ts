import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponse {
  status: boolean;
  data: {
    token: string;
  };
  statusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private apiUrl = `${environment.apiUrl}/authenticate`;
  private http = inject(HttpClient);

  authenticate(): Observable<AuthResponse> {
    const authRequest = {
      password: 'Fu5Mr3sE4rcH!'
    };
    
    return this.http.post<AuthResponse>(this.apiUrl, authRequest)
      .pipe(
        tap(response => {
          if (response.status && response.data?.token) {
            localStorage.setItem('api_token', response.data.token);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('api_token');
  }

  clearToken(): void {
    localStorage.removeItem('api_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
} 