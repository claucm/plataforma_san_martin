import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comite-docencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comite-docencia.component.html',
  styleUrls: ['./comite-docencia.component.css']
})
export class ComiteDocenciaComponent {
  comiteForm: FormGroup;
  actaComite: File | null = null;

  programasPregrado = [
    'Administración de Empresas',
    'Contaduría Pública',
    'Derecho',
    'Medicina Bogotá',
    'Medicina Cali',
    'Medicina Pasto',
    'Medicina Puerto Colombia',
    'Medicina Sabaneta',
    'Medicina Veterinaria y Zootecnia – Bogotá',
    'Medicina Veterinaria y Zootecnia – Cali',
    'Medicina Veterinaria y Zootecnia – Puerto Colombia',
    'Negocios Internacionales',
    'Nutrición y Dietética',
    'Odontología Bogotá',
    'Odontología Puerto Colombia',
    'Optometría',
    'Psicología',
    'Publicidad y Mercadeo'
  ];

  programasPosgrado = [
    'Especialización de Cirugía en Tejidos Blandos de Pequeños Animales',
    'Especialización en Medicina de Fauna Silvestre',
    'Especialización en Medicina Interna',
    'Especialización en Producción Animal'
  ];

  constructor(private fb: FormBuilder) {
    this.comiteForm = this.fb.group({
      fechaDiligenciamiento: ['', Validators.required],
      periodoAcademico: ['', [Validators.required, Validators.min(1)]],
      codigoUnidad: ['', [Validators.required, Validators.min(1)]],
      nivelEstudio: ['', Validators.required],
      facultad: ['', Validators.required],
      programaPregrado: [''],  // Added this line
      programaPosgrado: [''],  // Added this line
      sede: ['', Validators.required],
      nombreComite: ['', Validators.required],
      fechaComite: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      participantes: ['', [Validators.required, Validators.min(1)]],
      actaComite: [null, Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.comiteForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.actaComite = input.files[0];
      this.comiteForm.patchValue({ actaComite: this.actaComite });
    }
  }

  onSubmit() {
    if (this.comiteForm.valid) {
      console.log('Formulario enviado:', this.comiteForm.value);
    } else {
      this.comiteForm.markAllAsTouched();
    }
  }
}