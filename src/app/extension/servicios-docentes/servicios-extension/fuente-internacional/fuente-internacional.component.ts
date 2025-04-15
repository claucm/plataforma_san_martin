import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fuente-internacional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fuente-internacional.component.html',
  styleUrls: ['./fuente-internacional.component.css']
})
export class FuenteInternacionalComponent {
  fuenteInternacionalForm: FormGroup;
  
  fuentesInternacionales = [
    { id: 1, nombre: 'Sector Empresarial' },
    { id: 2, nombre: 'Sector Administración Pública' },
    { id: 3, nombre: 'Centros de Investigación y Desarrollo Tecnológico' },
    { id: 4, nombre: 'Hospitales y Clínicas' },
    { id: 5, nombre: 'Instituciones privadas sin ánimo de lucro' },
    { id: 6, nombre: 'Instituciones de Educación Superior' },
    { id: 7, nombre: 'Organismo Multilateral' },
    { id: 8, nombre: 'Otra' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.fuenteInternacionalForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      nombreInstitucion: ['', [Validators.required, Validators.maxLength(200)]],
      idPaisFinanciador: ['', [Validators.required, Validators.max(999)]],
      idFuenteInternacional: ['', Validators.required],
      valorFinanciado: ['', [Validators.required, Validators.max(999999999999999)]]
    });
  }

  onSubmit() {
    if (this.fuenteInternacionalForm.valid) {
      console.log(this.fuenteInternacionalForm.value);
    } else {
      this.fuenteInternacionalForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.fuenteInternacionalForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}