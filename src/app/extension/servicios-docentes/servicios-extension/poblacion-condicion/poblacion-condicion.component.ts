import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poblacion-condicion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './poblacion-condicion.component.html',
  styleUrls: ['./poblacion-condicion.component.css']
})
export class PoblacionCondicionComponent {
  poblacionForm: FormGroup;
  
  poblacionCondiciones = [
    { id: 1, nombre: 'VULNERABILIDAD SOCIAL -Violencia Intrafamiliar' },
    { id: 2, nombre: 'VULNERABILIDAD SOCIAL - Violencia sexual' },
    { id: 3, nombre: 'VULNERABILIDAD SOCIAL - Riesgo o abandono' },
    { id: 4, nombre: 'VULNERABILIDAD SOCIAL - Habitante de calle' },
    { id: 5, nombre: 'VULNERABILIDAD SOCIAL - Mujeres cabeza de familia' },
    { id: 6, nombre: 'VULNERABILIDAD SOCIAL – Otro' },
    { id: 7, nombre: 'VULNERABILIDAD ECONÓMICA – Desempleo' },
    { id: 8, nombre: 'VULNERABILIDAD ECONÓMICA - Explotación laboral' },
    { id: 9, nombre: 'VULNERABILIDAD ECONÓMICA - Tráfico de personas' },
    { id: 10, nombre: 'VULNERABILIDAD ECONÓMICA – Prostitución' },
    { id: 11, nombre: 'VULNERABILIDAD ECONÓMICA – Otro' },
    { id: 12, nombre: 'RECLUSIÓN' },
    { id: 13, nombre: 'CONSUMO DE SUSTANCIAS PSICOACTIVAS' },
    { id: 14, nombre: 'NECESIDADES EDUCATIVAS ESPECIALES -Personas en condición de discapacidad' },
    { id: 15, nombre: 'NECESIDADES EDUCATIVAS ESPECIALES - Personas con talentos excepcionales' },
    { id: 16, nombre: 'HABITANTES DE FRONTERA' },
    { id: 17, nombre: 'AFECTADOS POR LA VIOLENCIA – Desplazamiento' },
    { id: 18, nombre: 'AFECTADOS POR LA VIOLENCIA – Reincorporación' },
    { id: 19, nombre: 'AFECTADOS POR LA VIOLENCIA – Desmovilización' },
    { id: 20, nombre: 'AFECTADOS POR LA VIOLENCIA - Victimas de Minas antipersonal' },
    { id: 21, nombre: 'AFECTADOS POR LA VIOLENCIA – Secuestro' },
    { id: 22, nombre: 'GRUPOS ÉTNICOS – Indígenas' },
    { id: 23, nombre: 'GRUPOS ÉTNICOS – Afrocolombianos' },
    { id: 24, nombre: 'GRUPOS ÉTNICOS - Rrom o Gitano' },
    { id: 25, nombre: 'Otra' }
  ];

  semestres = [1, 2];

  constructor(private fb: FormBuilder) {
    this.poblacionForm = this.fb.group({
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      codigoUnidad: ['', [Validators.required, Validators.maxLength(30)]],
      codigoServicio: ['', [Validators.required, Validators.maxLength(15)]],
      idPoblacionCondicion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.poblacionForm.valid) {
      console.log(this.poblacionForm.value);
    } else {
      this.poblacionForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.poblacionForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
}