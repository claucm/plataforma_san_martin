import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-semillero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './semillero-form.component.html',
  styleUrls: ['./semillero-form.component.css']
})
export class SemilleroFormComponent {
  @Input() semilleroData: any;
  @Output() formSubmit = new EventEmitter<any>();

  // Lista de integrantes (esto podría venir de un servicio)
  listaIntegrantes = [
    'Juan Pérez - Investigador',
    'María González - Estudiante',
    'Carlos Rodríguez - Coordinador',
    // ... más integrantes
  ];

  // Productos definidos por MINCIENCIAS
  productosMinciencias = [
    'Artículos de investigación',
    'Libros resultado de investigación',
    'Capítulos de libro',
    'Productos tecnológicos patentados',
    'Variedades vegetales',
    'Productos resultados de creación en artes',
    'Productos de formación de recurso humano',
    'Proyectos de investigación y desarrollo',
    'Proyectos de investigación-creación',
    'Proyectos ID+I con formación',
    'Proyectos de extensión y responsabilidad social en CTI'
  ];

  semilleroForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    estado: ['', Validators.required],
    integrantes: [[], Validators.required],
    productos: [[], Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.semilleroForm.valid) {
      this.formSubmit.emit(this.semilleroForm.value);
    } else {
      this.marcarCamposInvalidos();
    }
  }

  private marcarCamposInvalidos() {
    Object.keys(this.semilleroForm.controls).forEach(key => {
      const control = this.semilleroForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }
}