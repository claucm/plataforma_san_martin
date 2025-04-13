import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicios-de-extension',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicios-de-extension.component.html',
  styleUrls: ['./servicios-de-extension.component.css']
})
export class ServiciosDeExtensionComponent implements OnInit {
  servicioForm: FormGroup;

  years = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);
  semestres = [1, 2];
  areasExtension = [
    { id: 1, nombre: 'Servicio Social' },
    { id: 2, nombre: 'Gestión tecnológica' },
    { id: 3, nombre: 'Programas interdisciplinarios' },
    { id: 4, nombre: 'Otro' }
  ];

  constructor(private fb: FormBuilder) {
    this.servicioForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      nombreServicio: ['', [Validators.required, Validators.maxLength(400)]],
      descripcionServicio: ['', [Validators.required, Validators.maxLength(250)]],
      valorServicio: ['', [Validators.required, Validators.max(999999999999999)]],
      idAreaExtension: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      nombreContacto: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoContacto: ['', [Validators.required, Validators.maxLength(50)]],
      telefonoContacto: ['', [Validators.required, Validators.maxLength(15)]],
      emailContacto: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      tieneCosto: ['', Validators.required],
      criterioElegibilidad: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.servicioForm.valid) {
      console.log(this.servicioForm.value);
    } else {
      this.servicioForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.servicioForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}