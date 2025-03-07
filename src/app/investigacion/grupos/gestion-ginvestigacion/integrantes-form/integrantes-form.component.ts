import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Integrante {
  nombre: string;
  documento: string;
  fechaVinculacion: Date;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-integrantes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './integrantes-form.component.html',
  styleUrls: ['./integrantes-form.component.css']
})
export class IntegrantesFormComponent {
  @Input() grupoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  roles = [
    'Investigador Principal',
    'Coinvestigador',
    'Investigador Junior',
    'Estudiante investigador',
    'Auxiliar de investigación'
  ];

  estados = ['Activo', 'Inactivo', 'Suspendido'];

  integrantesForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    documento: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    fechaVinculacion: ['', Validators.required],
    rol: ['', Validators.required],
    estado: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.integrantesForm.valid) {
      this.formSubmit.emit(this.integrantesForm.value);
    }
  }
}