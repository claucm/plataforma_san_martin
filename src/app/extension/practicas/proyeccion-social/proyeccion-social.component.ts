import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyeccion-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyeccion-social.component.html',
  styleUrls: ['./proyeccion-social.component.css']
})
export class ProyeccionSocialComponent implements OnInit {
  proyeccionForm!: FormGroup;

  tiposActividad = ['Diplomado', 'Seminario', 'Curso', 'Congreso', 'Conferencia', 'Conversatorio', 'Estrategias pedagógicas', 'Taller', 'Otro'];
  opcionesExtracurricular = ['Sí', 'No'];
  sitiosPractica = ['Comunidad', 'Colegio', 'Hogares', 'Fundación', 'Otra'];
  tipos: string[] = ['Voluntariado', 'Proyecto Comunitario', 'Investigación', 'Educación', 'Salud'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.proyeccionForm = this.fb.group({
      fechaDiligenciamiento: ['', Validators.required],
      periodoAcademico: ['', Validators.required],
      tipoActividad: ['', Validators.required],
      tipo: ['', Validators.required], // ✅ Se añadió este control
      facultad: ['', Validators.required],
      programa: ['', Validators.required],
      sede: ['', Validators.required],
      unidadOrganizacional: ['', Validators.required],
      semestre: ['', [Validators.required, Validators.min(1)]],
      asignatura: ['', Validators.required],
      actividadExtracurricular: ['', Validators.required],
      servicioPrestado: ['', Validators.required],
      objetivoServicio: ['', Validators.required],
      numeroEstudiantes: ['', [Validators.required, Validators.min(1)]],
      profesoresParticipantes: ['', Validators.required],
      sitioPractica: ['', Validators.required],
      direccion: ['', Validators.required],
      grupoPoblacional: ['', Validators.required],
      docenteEncargado: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      productosObtenidos: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.proyeccionForm.valid) {
      console.log('Datos del formulario:', this.proyeccionForm.value);
    } else {
      this.proyeccionForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.proyeccionForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}

