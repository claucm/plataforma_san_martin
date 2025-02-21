import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convenios-docencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importar aquí también
  templateUrl: './convenios-docencia.component.html',
  styleUrls: ['./convenios-docencia.component.css']
})
export class ConveniosDocenciaComponent {
  convenioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.convenioForm = this.fb.group({
      areaPractica: ['', Validators.required],
      numeroHospitales: [0, [Validators.required, Validators.min(1)]],
      nombreHospitales: ['', Validators.required],
      sede: ['', Validators.required],
      codigoReps: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      codigoDhss: ['', Validators.required],
      sujetoContraprestacion: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      estudiantesSemestre: [0, [Validators.required, Validators.min(1)]],
      rotacionesConvenio: [0, [Validators.required, Validators.min(1)]],
      estudiantesPrograma: [0, [Validators.required, Validators.min(1)]],
      cuposActivos: [0, [Validators.required, Validators.min(1)]],
      estudiantesSimultanea: [0, [Validators.required, Validators.min(1)]],
      anexosTecnicos: [null, Validators.required],
      observaciones: ['', Validators.required],
      evaluacion: [null, Validators.required]
    });
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.convenioForm.patchValue({ [fieldName]: file });
    }
  }

  onSubmit() {
    if (this.convenioForm.valid) {
      console.log('Formulario enviado:', this.convenioForm.value);
      this.convenioForm.reset();
    } else {
      console.log('Formulario inválido');
      this.convenioForm.markAllAsTouched();
    }
  }
}
