import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fuente-nacional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fuente-nacional.component.html',
  styleUrls: ['./fuente-nacional.component.css']
})
export class FuenteNacionalComponent {
  fuenteNacionalForm: FormGroup;
  
  fuentesNacionales = [
    { id: 1, nombre: 'Recursos IES' },
    { id: 2, nombre: 'Recursos públicos nacionales' },
    { id: 3, nombre: 'Recursos públicos departamentales' },
    { id: 4, nombre: 'Recursos públicos municipales o distritales' },
    { id: 5, nombre: 'Recursos Privados' },
    { id: 6, nombre: 'Recursos de Organizaciones sin ánimo de lucro' },
    { id: 7, nombre: 'Otras Entidades' },
    { id: 8, nombre: 'Recursos propios personales' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    console.log('FuenteNacional Component Initialized');
    this.fuenteNacionalForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idFuenteNacional: ['', Validators.required],
      valorFinanciado: ['', [Validators.required, Validators.max(999999999999999)]]
    });
  }

  onSubmit() {
    if (this.fuenteNacionalForm.valid) {
      console.log(this.fuenteNacionalForm.value);
    } else {
      this.fuenteNacionalForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.fuenteNacionalForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}