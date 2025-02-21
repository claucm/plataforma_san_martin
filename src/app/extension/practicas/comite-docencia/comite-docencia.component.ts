import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.comiteForm = this.fb.group({
      fechaDiligenciamiento: ['', Validators.required],
      periodoAcademico: ['', [Validators.required, Validators.min(1)]],
      codigoUnidad: ['', [Validators.required, Validators.min(1)]],
      nivelEstudio: ['', Validators.required],
      facultad: ['', Validators.required],
      programa: ['', Validators.required],
      sede: ['', Validators.required],
      nombreComite: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
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
