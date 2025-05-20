import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ApiAuthService } from './api-auth.service';

export abstract class BaseService<T> {
  protected http = inject(HttpClient);
  protected apiAuthService = inject(ApiAuthService);
  protected abstract endpoint: string;

  protected get apiUrl(): string {
    return `${environment.apiUrl}/${this.endpoint}`;
  }

  protected ensureAuthenticated<R>(operation: () => Observable<R>): Observable<R> {
    if (!this.apiAuthService.isAuthenticated()) {
      return this.apiAuthService.authenticate().pipe(
        switchMap(() => operation())
      );
    }
    return operation();
  }

  getAll(): Observable<ApiResponse<T[]>> {
    return this.ensureAuthenticated(() => 
      this.http.get<ApiResponse<T[]>>(this.apiUrl)
    );
  }

  getById(id: number): Observable<ApiResponse<T>> {
    return this.ensureAuthenticated(() => 
      this.http.get<ApiResponse<T>>(`${this.apiUrl}/${id}`)
    );
  }

  create(item: T): Observable<ApiResponse<T>> {
    return this.ensureAuthenticated(() => 
      this.http.post<ApiResponse<T>>(this.apiUrl, item)
    );
  }

  update(id: number, item: T): Observable<ApiResponse<T>> {
    return this.ensureAuthenticated(() => 
      this.http.put<ApiResponse<T>>(`${this.apiUrl}/${id}`, item)
    );
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.ensureAuthenticated(() => 
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
    );
  }
} 