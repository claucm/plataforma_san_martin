import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-participante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent {
  participanteForm: FormGroup;
  
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

  constructor(private fb: FormBuilder) {
    this.participanteForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      fechaExpedicion: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      idSexoBiologico: ['', Validators.required],
      idEstadoCivil: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idPais: ['170', Validators.required], // Default Colombia
      idMunicipio: ['', Validators.required],
      telefonoContacto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailPersonal: ['', [Validators.required, Validators.email]],
      emailInstitucional: ['', [Validators.required, Validators.email]],
      direccionInstitucional: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.participanteForm.valid) {
      console.log(this.participanteForm.value);
    } else {
      this.participanteForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.participanteForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}