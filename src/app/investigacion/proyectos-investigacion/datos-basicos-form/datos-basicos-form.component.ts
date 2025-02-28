import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-basicos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.css']
})
export class DatosBasicosFormComponent {
  @Input() proyectoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  // Arrays para los selectores
  estados = ['Ingreso', 'Aprobado', 'Rechazado', 'En Proceso'];
  roles = ['Investigador Principal', 'Coinvestigador', 'Auxiliar', 'Asesor'];
  centrosCosto = ['Centro 1', 'Centro 2', 'Centro 3', 'Centro 4'];
  areasConocimiento = [
    'Ciencias Naturales',
    'Ingeniería y Tecnología',
    'Ciencias Médicas y de la Salud',
    'Ciencias Agrícolas',
    'Ciencias Sociales',
    'Humanidades'
  ];

  datosBasicosForm: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    titulo: ['', Validators.required],
    estado: ['', Validators.required],
    paginaWeb: [''],
    anioInicio: ['', Validators.required],
    convocatoria: ['', Validators.required],
    anioConvocatoria: ['', Validators.required],
    duracionPrevista: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    duracionProrrogas: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    fechaInicio: ['', Validators.required],
    fechaTerminacion: ['', Validators.required],
    codigoExterno: ['', Validators.pattern('^[0-9]*$')],
    formacionInvestigativa: ['', Validators.required],
    interdisciplinaria: ['', Validators.required],
    intergrupos: ['', Validators.required],
    tesisDoctoral: [''],
    rolFUSM: ['', Validators.required],
    centroCosto: ['', Validators.required],
    potencialDesarrollo: ['', Validators.required],
    objetivoGeneral: ['', Validators.required],
    palabrasClave: ['', Validators.required],
    resumen: ['', Validators.required],
    observaciones: [''],
    objetivosEspecificos: ['', Validators.required],
    areaConocimiento: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.datosBasicosForm.valid) {
      this.formSubmit.emit(this.datosBasicosForm.value);
    }
  }
}