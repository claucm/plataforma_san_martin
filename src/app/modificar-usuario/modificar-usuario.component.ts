import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  formulario: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required)
    });
  }

  modificarUsuario(): void {
    if (this.formulario.valid) {
      console.log('Formulario válido');
      // Aquí puedes agregar la lógica para modificar el usuario
    } else {
      console.log('Formulario inválido');
    }
  }
}