import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poblacion-grupo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './poblacion-grupo.component.html',
  styleUrls: ['./poblacion-grupo.component.css']
})
export class PoblacionGrupoComponent {
  poblacionGrupoForm: FormGroup;
  
  poblacionGrupos = [
    { id: 1, nombre: 'Familia' },
    { id: 2, nombre: 'Géneros' },
    { id: 3, nombre: 'Profesionales' },
    { id: 4, nombre: 'Grupos étnicos' },
    { id: 5, nombre: 'Campesinos' },
    { id: 6, nombre: 'Mujeres' },
    { id: 7, nombre: 'Empleados' },
    { id: 8, nombre: 'Comunidades' },
    { id: 9, nombre: 'Empresas, MiPymes' },
    { id: 10, nombre: 'Entidades Gubernamentales' },
    { id: 11, nombre: 'Otro' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.poblacionGrupoForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idPoblacionGrupo: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0), Validators.max(9999999999)]]
    });
  }

  onSubmit() {
    if (this.poblacionGrupoForm.valid) {
      console.log(this.poblacionGrupoForm.value);
    } else {
      this.poblacionGrupoForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.poblacionGrupoForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}
