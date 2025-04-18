import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
    constructor(private http: HttpClient) { }
  
    crearUsuario(usuario: any): any {
      return this.http.post(this.apiUrl, usuario);
    }
  
  }