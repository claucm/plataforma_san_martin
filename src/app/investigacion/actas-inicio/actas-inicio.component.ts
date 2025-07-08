import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actas-inicio',
  templateUrl: './actas-inicio.component.html',
  styleUrls: ['./actas-inicio.component.css'],
  providers: [DatePipe],
  standalone: true,
  imports: [FormsModule]
})
export class ActasInicioComponent {
  acta = {
    convocatoria: '',
    titulo: '',
    codigo: '',
    estado: 'pendiente',
    duracion: null,
    areaConocimiento: '',
    caracteristicas: '',
    palabrasClave: '',
    objetivoGeneral: '',
    objetivosEspecificos: '',
    resumen: '',
    unidadesAcademicas: '',
    entidadesExternas: '',
    compromisos: '',
    interdisciplinarios: 'si',
    intergrupos: 'si',
    areaEstrategica: '',
    observaciones: ''
  };

  fechaAprobacion: Date | null = null;

  constructor(private datePipe: DatePipe) {}

  cambiarEstado(nuevoEstado: string) {
    this.acta.estado = nuevoEstado;
    if (nuevoEstado === 'aprobado') {
      this.fechaAprobacion = new Date();
    } else {
      this.fechaAprobacion = null;
    }
  }

  get formattedFechaAprobacion(): string {
    return this.fechaAprobacion ? this.datePipe.transform(this.fechaAprobacion, 'dd/MM/yyyy') ?? '' : '';
  }

  onSubmit() {
    // Save the state and observation logic here
    console.log('Estado guardado:', this.acta.estado);
    console.log('Observaciones:', this.acta.observaciones);
    alert('Estado y observaciones guardados correctamente.');
  }
}
