import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apertura-convocatoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apertura-convocatoria.component.html',
  styleUrls: ['./apertura-convocatoria.component.css']
})
export class AperturaConvocatoriaComponent implements OnInit {
  codigoConvocatoria: string = ''; // Changed to string to hold formatted code
  titulo: string = '';
  descripcion: string = '';
  fechaCreacion: string = new Date().toISOString().split('T')[0];
  fechaApertura: string = '';
  fechaCierre: string = '';
  presupuesto: number | null = null;
  estado: string = '';
  tipoConvocatoria: string = '';
  documentoConvocatoria: File | null = null;

  estados: string[] = ['Activo', 'Publicado', 'Inactivo'];
  tiposConvocatoria: string[] = ['interna, externa, seguimiento']; // opciones
  ngOnInit() {
    if (!this.codigoConvocatoria) {
      this.generarCodigoConvocatoria();
    }
  }

  generarCodigoConvocatoria() {
    const incremental = 1; // For now, static 1; in real app, fetch last incremental and add 1
    this.codigoConvocatoria = incremental.toString();
    console.log('Generated codigoConvocatoria:', this.codigoConvocatoria);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.documentoConvocatoria = file;
    } else {
      alert('Por favor seleccione un archivo PDF válido.');
      event.target.value = null;
      this.documentoConvocatoria = null;
    }
  }

  createConvocatoria() {
    // Implement form submission logic here
    console.log('Crear convocatoria:', {
      codigoConvocatoria: this.codigoConvocatoria,
      titulo: this.titulo,
      descripcion: this.descripcion,
      fechaCreacion: this.fechaCreacion,
      fechaApertura: this.fechaApertura,
      fechaCierre: this.fechaCierre,
      presupuesto: this.presupuesto,
      estado: this.estado,
      tipoConvocatoria: this.tipoConvocatoria,
      documentoConvocatoria: this.documentoConvocatoria,
      criteriosEvaluacion: this.criteriosEvaluacion
    });
    // Reset form or navigate as needed
  }

  showCriteriosModal: boolean = false;
  criteriosEvaluacion = [
    { factor: 'Título', puntajeMaximo: 5 },
    { factor: 'Problema de investigación (precisión, justificación, pertinencia)', puntajeMaximo: 10 },
    { factor: 'El estado del arte está soportado por referencias bibliográficas relevantes y actualizadas', puntajeMaximo: 10 },
    { factor: 'Objetivos: El objetivo general es pertinente y coherente con el problema de investigación. Los objetivos específicos permiten el logro del objetivo general y dar respuesta al problema', puntajeMaximo: 25 },
    { factor: 'Materiales y métodos (coherencia y rigor)', puntajeMaximo: 20 },
    { factor: 'Interdisciplinariedad, participación y conformación del equipo de investigación', puntajeMaximo: 5 },
    { factor: 'Resultados esperados. Aporte al conocimiento, al desarrollo tecnológico o a la innovación y son coherentes con los objetivos específicos', puntajeMaximo: 6 },
    { factor: 'Se plantean resultados que aporten a más de una disciplina', puntajeMaximo: 2 },
    { factor: 'El proyecto incluye actividades para la formación investigativa de los estudiantes', puntajeMaximo: 2 },
    { factor: 'Concordancia del presupuesto con las actividades y resultados', puntajeMaximo: 5 },
    { factor: 'Los resultados esperados tienen posibles usos por parte del sector público, comunidades o el sector empresarial', puntajeMaximo: 5 },
    { factor: 'Cronograma de actividades (lógica secuencial, tiempos)', puntajeMaximo: 5 }
  ];

  totalPuntaje: number = this.criteriosEvaluacion.reduce((sum, c) => sum + c.puntajeMaximo, 0);
  errorPuntaje: string = '';

  openCriteriosModal() {
    this.showCriteriosModal = true;
  }

  closeCriteriosModal() {
    this.showCriteriosModal = false;
    this.errorPuntaje = '';
  }

  updatePuntaje(index: number, value: number) {
    if (value < 0) value = 0;
    this.criteriosEvaluacion[index].puntajeMaximo = value;
    this.totalPuntaje = this.criteriosEvaluacion.reduce((sum, c) => sum + c.puntajeMaximo, 0);
    if (this.totalPuntaje > 100) {
      this.errorPuntaje = 'El puntaje total no puede superar los 100 puntos.';
    } else {
      this.errorPuntaje = '';
    }
  }
}
