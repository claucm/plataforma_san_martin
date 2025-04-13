import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entidad-nacional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entidad-nacional.component.html',
  styleUrls: ['./entidad-nacional.component.css']
})
export class EntidadNacionalComponent {
  entidadNacionalForm: FormGroup;
  
  entidadesNacionales = [
    { id: 1, nombre: 'Consejería Presidencial para la Equidad de la Mujer' },
    { id: 2, nombre: 'Defensoría del Pueblo' },
    { id: 3, nombre: 'ICBF - Instituto Colombiano de Bienestar Familiar' },
    { id: 4, nombre: 'SENA - Servicio Nacional de Aprendizaje' },
    { id: 5, nombre: 'Superintendencia de Notariado y Registro Publico' },
    { id: 6, nombre: 'Universidad Nacional de Colombia' },
    { id: 7, nombre: 'Unidad Ejecutiva de Servicios Públicos' },
    { id: 8, nombre: 'Superintendencia de Subsidio Familiar' },
    { id: 9, nombre: 'ACCI - Agencia Colombiana de Cooperación internacional' },
    { id: 10, nombre: 'Colombia Jóven' },
    { id: 11, nombre: 'Colciencias' },
    { id: 12, nombre: 'Ministerio del Interior y Justicia' },
    { id: 13, nombre: 'Ministerio de Relaciones Exteriores' },
    { id: 14, nombre: 'Ministerio de Hacienda y Crédito Público' },
    { id: 15, nombre: 'Ministerio de Defensa Nacional' },
    { id: 16, nombre: 'Ministerio de Agricultura y Desarrollo rural' },
    { id: 17, nombre: 'Ministerio de Protección Social' },
    { id: 18, nombre: 'Ministerio de Minas y Energía' },
    { id: 19, nombre: 'Ministerio de Comercio, Industria y Turismo' },
    { id: 20, nombre: 'Ministerio de Educación Nacional' },
    { id: 21, nombre: 'Ministerio de Ambiente, Vivienda y Desarrollo' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.entidadNacionalForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idEntidadNacional: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.entidadNacionalForm.valid) {
      console.log(this.entidadNacionalForm.value);
    } else {
      this.entidadNacionalForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.entidadNacionalForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}