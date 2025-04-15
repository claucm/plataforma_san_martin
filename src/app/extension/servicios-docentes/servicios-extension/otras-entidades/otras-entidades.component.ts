import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otras-entidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otras-entidades.component.html',
  styleUrls: ['./otras-entidades.component.css']
})
export class OtrasEntidadesComponent {
  otrasEntidadesForm: FormGroup;
  
  sectoresEntidad = [
    { id: 1, nombre: 'Sector Empresarial' },
    { id: 2, nombre: 'Centros de Investigación y Desarrollo Tecnológico' },
    { id: 3, nombre: 'Hospitales y Clínicas' },
    { id: 4, nombre: 'Instituciones privadas sin ánimo de lucro' },
    { id: 5, nombre: 'Instituciones de Educación' },
    { id: 6, nombre: 'Otro' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.otrasEntidadesForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      nombreEntidad: ['', [Validators.required, Validators.maxLength(200)]],
      idPaisEntidad: ['', Validators.required],
      idSectorEntidad: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.otrasEntidadesForm.valid) {
      console.log(this.otrasEntidadesForm.value);
    } else {
      this.otrasEntidadesForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.otrasEntidadesForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}
