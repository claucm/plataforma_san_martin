import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-practicas-profesionales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './practicas-profesionales.component.html',
  styleUrls: ['./practicas-profesionales.component.css']
})
export class PracticasProfesionalesComponent {
  practicasForm: FormGroup;
  
  nivelesEstudio: string[] = ['Pregrado', 'Posgrado'];
 
  tiposPractica: string[] = [
    'Laboratorios',
    'Salidas pedagógicas',
    'Salidas de campo',
    'Práctica profesional',
    'Práctica docente asistencial',
    'Internado',
    'Consultorio jurídico',
    'Judicatura',
    'Pasantías',
    'Rotaciones',
    'Otro'
  ];

  constructor(private fb: FormBuilder) {
    this.practicasForm = this.fb.group({
      fechaDiligenciamiento: ['', Validators.required],
      periodoAcademico: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      codigoUnidad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nivelEstudio: ['', Validators.required],
      facultad: ['', Validators.required],
      programa: ['', Validators.required],
      sede: ['', Validators.required],
      unidadOrganizacional: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombreConvenio: ['', Validators.required],
      cupos: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      estudiantesAplicaron: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      semestre: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      tipoPractica: ['', Validators.required],
      otroTipoPractica: [''],
      areaConocimiento: ['', Validators.required],
      asignaturaModulo: ['', Validators.required],
    });
  }

  isInvalid(field: string): boolean {
    return (this.practicasForm.get(field)?.invalid ?? false) && (this.practicasForm.get(field)?.touched ?? false);
  }

  onSubmit() {
    if (this.practicasForm.valid) {
      console.log('Formulario enviado:', this.practicasForm.value);
    } else {
      console.log('Formulario no válido');
      this.practicasForm.markAllAsTouched();
    }
  }
}

