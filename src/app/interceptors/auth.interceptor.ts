import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiAuthService } from '../services/api-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiAuthService = inject(ApiAuthService);
  const token = apiAuthService.getToken();
  
  if (token && !req.url.includes('/authenticate')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
}; 