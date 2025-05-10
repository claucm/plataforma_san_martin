import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educacion-continuada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './educacion-continuada.component.html',
  styleUrls: ['./educacion-continuada.component.css']
})
export class EducacionContinuadaComponent implements OnInit {
  generalForm!: FormGroup;
  reseniaForm!: FormGroup;

  nivelesFormacion = [
    { id: 1, nombre: 'Técnica profesional' },
    { id: 2, nombre: 'Módulos' },
    { id: 3, nombre: 'Profesional' },
    { id: 4, nombre: 'Cursos' },
    { id: 5, nombre: 'Micromáster' },
    { id: 6, nombre: 'Diplomado' },
    { id: 7, nombre: 'Seminario' },
    { id: 8, nombre: 'Taller' }
  ];

  estrategiasMetodologicas = [
    { id: 1, nombre: 'Presencial' },
    { id: 2, nombre: 'Semi presencial' },
    { id: 3, nombre: 'A distancia' },
    { id: 4, nombre: 'Virtual' },
    { id: 5, nombre: 'Presencial – Virtual' }
  ];

  areasConocimiento = [
    { id: 1, nombre: 'Formación investigativa' },
    { id: 2, nombre: 'Formación en ciencias básicas' },
    { id: 3, nombre: 'Profesional' },
    { id: 4, nombre: 'Económica' },
    { id: 5, nombre: 'Ciencias de la educación' },
    { id: 6, nombre: 'Ciencias de la salud' },
    { id: 7, nombre: 'Humana y social' },
    { id: 8, nombre: 'Medicina veterinaria' }
  ];

  tiposCurso = [
    { id: 1, nombre: 'Teórico' },
    { id: 2, nombre: 'Teórico práctico' },
    { id: 3, nombre: 'Práctico' }
  ];

  gruposFormacion = [
    { id: 1, nombre: 'Cursos' },
    { id: 2, nombre: 'Seminario' },
    { id: 3, nombre: 'Taller' },
    { id: 4, nombre: 'Diplomados' },
    { id: 5, nombre: 'Curso - taller' },
    { id: 6, nombre: 'Congreso' }
  ];

  controlAsistencia = [
    { id: 1, nombre: 'Con nota' },
    { id: 2, nombre: 'Sin nota' },
    { id: 3, nombre: 'No aplica' }
  ];

  valoresEvento = [
  { id: 1, nombre: 'Valor 1' },
  { id: 2, nombre: 'Valor 2' },
  { id: 3, nombre: 'Valor 3' }
  
];
  
centrosCostos = [
  { id: 1, nombre: 'Centro de Costos 1' },
  { id: 2, nombre: 'Centro de Costos 2' },
  { id: 3, nombre: 'Centro de Costos 3' }

];

  tiposNota = [
    { id: 1, nombre: 'Alfanumérica' },
    { id: 2, nombre: 'Numérica' }
  ];

  notasPosibles = [
    { id: 1, nombre: 'VALFI Tabla de nota de inglés' },
    { id: 2, nombre: 'VALFA6 Registro de asistencia sin nota' },
    { id: 3, nombre: 'VALFA1 Tabla de notas alfanuméricas' },
    { id: 4, nombre: 'VALFA4 Alfanumérica' }
  ];

  notasMinimas = [
    { id: 1, nombre: 'Asistió' },
    { id: 2, nombre: 'No asistió' }
  ];

  notasMaximas = [
    { id: 1, nombre: 'Asistió' },
    { id: 2, nombre: 'No asistió' }
  ];

  notasAprobacion = [
    { id: 1, nombre: 'Asistió' },
    { id: 2, nombre: 'No asistió' }
  ];

  notasValfi = [
    { id: 1, nombre: 'A1' },
    { id: 2, nombre: 'A2' },
    { id: 3, nombre: 'B1' },
    { id: 4, nombre: 'B2' },
    { id: 5, nombre: 'C1' },
    { id: 6, nombre: 'C2' }
  ];

  notasAsistencia = [
    { id: 1, nombre: 'Asistió' },
    { id: 2, nombre: 'No asistió' }
  ];

  estados = [
  { id: 1, nombre: 'Inactivo' },
  { id: 2, nombre: 'Activo' },
  { id: 3, nombre: 'Suspendido' },
  { id: 4, nombre: 'Cancelado' },
  { id: 5, nombre: 'Sin definir' }
];

certificados = [
  { id: 1, nombre: 'Certificado Tipo 1' },
  { id: 2, nombre: 'Certificado Tipo 2' }
  
];

  // Event handlers
  onNotasPosiblesChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === '1') { // VALFI
      this.notasMinimas = [...this.notasValfi];
      this.notasMaximas = [...this.notasValfi];
      this.notasAprobacion = [...this.notasValfi];
    } else {
      this.notasMinimas = [...this.notasAsistencia];
      this.notasMaximas = [...this.notasAsistencia];
      this.notasAprobacion = [...this.notasAsistencia];
    }
    
    // Reset form controls
    this.generalForm.patchValue({
      notaMinima: '',
      notaMaxima: '',
      notaAprobacion: ''
    });
  }

  validateNotasRange() {
    const minima = this.generalForm.get('notaMinima')?.value;
    const maxima = this.generalForm.get('notaMaxima')?.value;
    const aprobacion = this.generalForm.get('notaAprobacion')?.value;

    if (minima && maxima && aprobacion) {
      if (minima > maxima) {
        this.generalForm.get('notaMinima')?.setErrors({ invalidRange: true });
      }
      if (aprobacion < minima || aprobacion > maxima) {
        this.generalForm.get('notaAprobacion')?.setErrors({ invalidRange: true });
      }
    }
  }

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  ngOnInit() {
    // Initialize notas arrays
    this.notasMinimas = [...this.notasAsistencia];
    this.notasMaximas = [...this.notasAsistencia];
    this.notasAprobacion = [...this.notasAsistencia];
  }

  

  private initializeForms() {
    this.generalForm = this.fb.group({
      nivelFormacion: ['', Validators.required],
      estrategiaMetodologica: ['', Validators.required],
      iniciaVigencia: ['', Validators.required],
      finVigencia: ['', Validators.required],
      duracionSesion: ['', [Validators.required, Validators.min(0)]],
      numeroSesiones: ['', [Validators.required, Validators.min(0)]],
      areaConocimiento: ['', Validators.required],
      nucleoBasico: ['', Validators.required],
      tipoCurso: ['', Validators.required],
      grupoFormacion: ['', Validators.required],
      reglamento: ['', Validators.required],
      resolucion: ['', Validators.required],
      permiteExternos: [false],
      // Campos financieros
      centroCostos: ['', Validators.required],
      valorEvento: ['', Validators.required],
      // Campos de control
      numeroNotas: ['', Validators.required],
      controlAsistencia: ['', Validators.required],
      porcentajeFallas: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      tipoNota: ['', Validators.required],
      notasPosibles: ['', Validators.required],
      notaMinima: ['', Validators.required],
      notaMaxima: ['', Validators.required],
      notaAprobacion: ['', Validators.required],
      cupoInicial: ['', [Validators.required, Validators.min(0)]],
      // Campos de vigencia
      estado: ['', Validators.required],
      // Campos de palabras clave
      palabrasClave: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      perfil: ['', Validators.required],
      // Campos de certificación
      generaCertificado: [false],
      certificado: ['']
    });

      // Subscribe to nota changes for validation
    const notaControls = ['notaMinima', 'notaMaxima', 'notaAprobacion'];
    notaControls.forEach(controlName => {
      this.generalForm.get(controlName)?.valueChanges.subscribe(() => {
        this.validateNotasRange();
      });
    });

    this.reseniaForm = this.fb.group({
      objetivo: ['', Validators.required],
      justificacion: ['', Validators.required],
      metodologia: ['', Validators.required],
      detallesEvento: ['', Validators.required],
      recursosRequeridos: ['', Validators.required],
      imagenEvento: ['']
    });
  }

  onSubmit() {
    if (this.generalForm.valid && this.reseniaForm.valid) {
      console.log('Formulario General:', this.generalForm.value);
      console.log('Formulario Reseña:', this.reseniaForm.value);
    } else {
      this.markFormGroupTouched(this.generalForm);
      this.markFormGroupTouched(this.reseniaForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

isInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

}
