import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IntermediarioService {
  constructor(private usuarioService: UsuarioService) { }

  crearUsuario(usuario: any): any {
    return this.usuarioService.crearUsuario(usuario);
  }
}