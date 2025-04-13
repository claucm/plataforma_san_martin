import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './area-trabajo.component.html',
  styleUrls: ['./area-trabajo.component.css']
})
export class AreaTrabajoComponent {
  areaTrabajoForm: FormGroup;
  
  areasTrabajoOptions = [
    { id: 1, nombre: 'Educación' },
    { id: 2, nombre: 'Salud' },
    { id: 3, nombre: 'Hábitat' },
    { id: 4, nombre: 'Movilidad y Espacio Público' },
    { id: 5, nombre: 'Desarrollo Productivo y Generación de Ingresos en Microempresas' },
    { id: 6, nombre: 'Desarrollo Productivo y Generación de Ingresos en Pequeñas Empresas' },
    { id: 7, nombre: 'Desarrollo Productivo y Generación de Ingresos en Medianas Empresas' },
    { id: 8, nombre: 'Desarrollo Productivo y Generación de Ingresos en Famiempresas' },
    { id: 9, nombre: 'Desarrollo Productivo y Generación de Ingresos en Otro tipo de Empresas' },
    { id: 10, nombre: 'Medio Ambiente y Recursos Naturales' },
    { id: 11, nombre: 'TIC' },
    { id: 12, nombre: 'Desarrollo Agrícola' },
    { id: 13, nombre: 'Desarrollo Tecnológico industrial' },
    { id: 14, nombre: 'Desarrollo social e inclusión' },
    { id: 15, nombre: 'Gestión pública y privada' },
    { id: 16, nombre: 'Otra' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.areaTrabajoForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idAreaTrabajo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.areaTrabajoForm.valid) {
      console.log(this.areaTrabajoForm.value);
    } else {
      this.areaTrabajoForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.areaTrabajoForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}