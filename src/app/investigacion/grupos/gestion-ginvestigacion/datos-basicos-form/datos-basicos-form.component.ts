import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-basicos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.css']
})
export class DatosBasicosFormComponent {
  @Input() grupoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  estados = ['Activo', 'Inactivo', 'Suspendido'];
  clasificaciones = ['A1', 'A', 'B', 'C', 'Reconocido'];
  lineasInvestigacion = ['Línea 1', 'Línea 2', 'Línea 3'];
  areasEstrategicas = ['Área 1', 'Área 2', 'Área 3'];
  lineasGrupo = ['Línea Grupo 1', 'Línea Grupo 2'];
  lineasInstitucionales = ['Línea Inst 1', 'Línea Inst 2'];

  datosBasicosForm: FormGroup = this.fb.group({
    codigoFUSM: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    nombreGrupo: ['', Validators.required],
    estado: ['', Validators.required],
    fechaCreacion: ['', Validators.required],
    clasificacion: ['', Validators.required],
    fechaClasificacion: ['', Validators.required],
    codigoMinciencias: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    linkGrupLac: ['', Validators.required],
    institucion: ['', Validators.required],
    descripcion: ['', Validators.required],
    observaciones: [''],
    lineasInvestigacionFUSM: this.fb.array([]),
    areaEstrategica: ['', Validators.required],
    lineaGrupo: ['', Validators.required],
    lineaInstitucional: ['', Validators.required],
    productos: this.fb.array([]),
    programaUnidadAcademica: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  get lineasInvestigacionFUSM() {
    return this.datosBasicosForm.get('lineasInvestigacionFUSM') as FormArray;
  }

  get productos() {
    return this.datosBasicosForm.get('productos') as FormArray;
  }

  agregarLineaInvestigacion() {
    this.lineasInvestigacionFUSM.push(this.fb.control('', Validators.required));
  }

  removerLineaInvestigacion(index: number) {
    this.lineasInvestigacionFUSM.removeAt(index);
  }

  agregarProducto() {
    const productoGroup = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]]
    });
    this.productos.push(productoGroup);
  }

  removerProducto(index: number) {
    this.productos.removeAt(index);
  }

  onSubmit() {
    if (this.datosBasicosForm.valid) {
      this.formSubmit.emit(this.datosBasicosForm.value);
    }
  }
}