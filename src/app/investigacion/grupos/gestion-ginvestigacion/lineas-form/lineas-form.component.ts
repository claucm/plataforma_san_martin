import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface Proyecto {
  codigo: number;
  titulo: string;
  estado: string;
}

interface LineaInvestigacion {
  nombre: string;
  descripcion: string;
  estado: string;
  proyectos: Proyecto[];
}

@Component({
  selector: 'app-lineas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lineas-form.component.html',
  styleUrls: ['./lineas-form.component.css']
})
export class LineasFormComponent {
  @Input() grupoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  estados = ['Activo', 'Inactivo', 'En desarrollo'];
  estadosProyecto = ['En curso', 'Finalizado', 'Suspendido'];

  lineasForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    estado: ['', Validators.required],
    proyectos: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {}

  get proyectos() {
    return this.lineasForm.get('proyectos') as FormArray;
  }

  agregarProyecto() {
    const proyectoGroup = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      titulo: ['', Validators.required],
      estado: ['', Validators.required]
    });
    this.proyectos.push(proyectoGroup);
  }

  removerProyecto(index: number) {
    this.proyectos.removeAt(index);
  }

  onSubmit() {
    if (this.lineasForm.valid) {
      this.formSubmit.emit(this.lineasForm.value);
    }
  }
}