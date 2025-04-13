import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caracterizacion-participantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './caracterizacion-participantes.component.html',
  styleUrls: ['./caracterizacion-participantes.component.css']
})
export class CaracterizacionParticipantesComponent {
  caracterizacionForm: FormGroup;

  tiposDocumento = [
    { id: 'CC', nombre: 'Cédula de ciudadanía' },
    { id: 'DE', nombre: 'Documento de Identidad Extranjera' },
    { id: 'CE', nombre: 'Cédula de Extranjería' },
    { id: 'TI', nombre: 'Tarjeta de Identidad' },
    { id: 'PS', nombre: 'Pasaporte' },
    { id: 'CA', nombre: 'Certificado cabildo' },
    { id: 'PT', nombre: 'PPT-Permiso por Protección Temporal' }
  ];

  sexoBiologico = [
    { id: 1, nombre: 'Masculino' },
    { id: 2, nombre: 'Femenino' }
  ];

  estadoCivil = [
    { id: 1, nombre: 'Soltero(a)' },
    { id: 2, nombre: 'Casado(a)' },
    { id: 3, nombre: 'Divorciado(a)' },
    { id: 4, nombre: 'Viudo(a)' },
    { id: 5, nombre: 'Unión libre' },
    { id: 6, nombre: 'Religioso(a)' },
    { id: 8, nombre: 'Separado(a)' }
  ];

  tiposVivienda = ['Propia', 'Arrendada', 'Familiar'];

  tiposProceso = [
    'Representación jurídica',
    'Consultoría jurídica'
  ];

  areasDerechoCon = [
    'Derecho laboral y seguridad en el trabajo',
    'Derecho privado',
    'Derecho penal',
    'Derecho público'
  ];

  constructor(private fb: FormBuilder) {
    this.caracterizacionForm = this.fb.group({
      periodoAcademico: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      lugarNacimiento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idPais: ['170', Validators.required], // Default Colombia
      idMunicipio: ['', Validators.required],
      fechaExpedicion: ['', Validators.required],
      idSexoBiologico: ['', Validators.required],
      idEstadoCivil: ['', Validators.required],
      direccionDomicilio: ['', Validators.required],
      localidad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      correoInstitucional: ['', [Validators.required, Validators.email]],
      direccionInstitucional: ['', Validators.required],
      numeroContacto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      profesionOficio: ['', Validators.required],
      estratoSocioeconomico: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
      vivienda: ['', Validators.required],
      condicionDiscapacidad: [false],
      cualDiscapacidad: [''],
      estudianteACargo: ['', Validators.required],
      tipoProceso: ['', Validators.required],
      areaDerechoConsulta: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.caracterizacionForm.valid) {
      console.log(this.caracterizacionForm.value);
    } else {
      this.caracterizacionForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.caracterizacionForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  currentStep = 1;
  totalSteps = 3;

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
}
}