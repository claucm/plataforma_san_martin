import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-resumen',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './ficha-resumen.component.html',
  styleUrls: ['./ficha-resumen.component.css']
})
export class FichaResumenComponent implements OnInit {
  fichaForm!: FormGroup;
  nivelesEstudio = ['Pregrado', 'Posgrado'];
  tiposEntidad = ['Pública', 'Privada'];
  tiposPractica = ['Remunerada', 'No remunerada'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fichaForm = this.fb.group({
      fechaDiligenciamiento: ['', Validators.required],
      periodoAcademico: ['', [Validators.required, Validators.min(1)]],
      codigoUnidad: ['', Validators.required],
      nivelEstudio: ['', Validators.required],
      facultad: ['', Validators.required],
      programa: ['', Validators.required],
      sede: ['', Validators.required],
      unidadOrganizacional: ['', Validators.required],
      coordinador: ['', Validators.required],
      nombreEntidad: ['', Validators.required],
      supervisor: this.fb.group({
        nombresApellidos: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        ciudad: ['', Validators.required],
        contactoUrl: ['', Validators.required]
      }),
      tipoEntidad: ['', Validators.required],
      numeroPracticantes: ['', [Validators.required, Validators.min(1)]],
      tipoPractica: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.fichaForm.valid) {
      console.log('Formulario enviado:', this.fichaForm.value);
    } else {
      this.fichaForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.fichaForm.get(controlName);
    return !!control && control.invalid && control.touched;

  }
}
