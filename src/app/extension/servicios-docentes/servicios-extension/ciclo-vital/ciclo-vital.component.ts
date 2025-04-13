import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ciclo-vital',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ciclo-vital.component.html',
  styleUrls: ['./ciclo-vital.component.css']
})
export class CicloVitalComponent {
  cicloVitalForm: FormGroup;
  
  ciclosVitales = [
    { id: 1, nombre: 'Primera infancia (0-5 años)' },
    { id: 2, nombre: 'Niñez (6-11 años)' },
    { id: 3, nombre: 'Jóvenes (12-26 años)' },
    { id: 4, nombre: 'Adultos (26-60 años)' },
    { id: 5, nombre: 'Adultos mayores (Mayores a 60)' },
    { id: 6, nombre: 'Todas las anteriores' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.cicloVitalForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idCicloVital: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.cicloVitalForm.valid) {
      console.log(this.cicloVitalForm.value);
    } else {
      this.cicloVitalForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.cicloVitalForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}

