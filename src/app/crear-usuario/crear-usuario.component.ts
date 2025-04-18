import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private usuarioService: UsuarioService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  crearUsuario(): void {
    if (this.formulario.valid) {
      this.usuarioService.crearUsuario(this.formulario.value).subscribe(() => {
        console.log('Usuario creado con éxito');
      }, (error: HttpErrorResponse) => {
        console.error('Error al crear usuario', error);
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}