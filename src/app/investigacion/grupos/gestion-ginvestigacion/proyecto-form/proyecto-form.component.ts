import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyecto-form.component.html',
  styleUrls: ['./proyecto-form.component.css']
})
export class ProyectoFormComponent {
  @Input() proyectoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  estados = ['En Proceso', 'Finalizado', 'Suspendido', 'Cancelado'];
  opcionesSiNo = ['Sí', 'No'];
  rolesProyecto = ['Investigador Principal', 'Coinvestigador', 'Auxiliar'];
  monografias = ['Pregrado', 'Especialización', 'Maestría', 'Doctorado', 'No Aplica'];

  proyectoForm: FormGroup = this.fb.group({
    codigoProyecto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    titulo: ['', Validators.required],
    estado: ['', Validators.required],
    paginaWeb: [''],
    convocatoria: ['', Validators.required],
    duracionPrevista: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    duracionProrrogas: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    fechaInicio: ['', Validators.required],
    fechaTerminacion: ['', Validators.required],
    cumplimiento: ['', Validators.required],
    codigoExterno: ['', Validators.pattern('^[0-9]*$')],
    investigacionFormativa: ['', Validators.required],
    interdisciplinario: ['', Validators.required],
    intergrupos: ['', Validators.required],
    monografias: [''],
    rolFUSM: ['', Validators.required],
    objetivoGeneral: ['', Validators.required],
    palabrasClave: ['', Validators.required],
    resumen: ['', Validators.required],
    observaciones: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.proyectoData) {
      this.proyectoForm.patchValue(this.proyectoData);
    }
  }

  onSubmit() {
    if (this.proyectoForm.valid) {
      this.formSubmit.emit(this.proyectoForm.value);
    } else {
      this.marcarCamposInvalidos();
    }
  }

  private marcarCamposInvalidos() {
    Object.keys(this.proyectoForm.controls).forEach(key => {
      const control = this.proyectoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }
}