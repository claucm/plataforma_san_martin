import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionProyectosService } from '../../services/evaluacion-proyectos.service';
import { Evaluador } from '../../models/evaluador.model';
import { Evaluacion } from '../../models/evaluacion.model';
import { ConceptoConsolidado } from '../../models/concepto-consolidado.model';

@Component({
  selector: 'app-evaluacion-proyectos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './evaluacion-proyectos.component.html',
  styleUrls: ['./evaluacion-proyectos.component.css']
})
export class EvaluacionProyectosComponent {
  evaluadores: Evaluador[] = [];
  evaluaciones: Evaluacion[] = [];
  conceptoConsolidado: ConceptoConsolidado | null = null;

  propuestaId: number | null = null;
  evaluadoresDisponibles: Evaluador[] = [];
  evaluadoresSeleccionados: Evaluador[] = [];
  minEvaluadores: number = 2;

  criteriosEvaluacion = [
    { id: 1, nombre: 'Originalidad', maxPuntaje: 30, puntaje: 0 },
    { id: 2, nombre: 'Viabilidad', maxPuntaje: 30, puntaje: 0 },
    { id: 3, nombre: 'Impacto', maxPuntaje: 40, puntaje: 0 }
  ];

  evaluacionActual: Evaluacion = {
    id: 0,
    propuestaId: 0,
    evaluadorId: 0,
    criterios: [],
    estado: 'pendiente',
    fechaEvaluacion: undefined,
    veredicto: undefined,
    razonesVeredicto: undefined
  };

  constructor(private evaluacionService: EvaluacionProyectosService) {
    this.cargarEvaluadoresDisponibles();
  }

  cargarEvaluadoresDisponibles(): void {
    this.evaluadoresDisponibles = [
      { id: 1, nombre: 'Juan Perez', profesion: 'Ingeniero', firma: '', areaConocimiento: 'Ciencias', conflictoInteres: false },
      { id: 2, nombre: 'Maria Gomez', profesion: 'Bióloga', firma: '', areaConocimiento: 'Biología', conflictoInteres: false },
      { id: 3, nombre: 'Carlos Ruiz', profesion: 'Químico', firma: '', areaConocimiento: 'Química', conflictoInteres: false }
    ];
  }

  onToggleEvaluador(evaluador: Evaluador, event: any): void {
    if (event.target.checked) {
      this.evaluadoresSeleccionados.push(evaluador);
    } else {
      this.evaluadoresSeleccionados = this.evaluadoresSeleccionados.filter(e => e.id !== evaluador.id);
    }
  }

  conflictoInteres(evaluador: Evaluador): boolean {
    return evaluador.nombre.includes('Juan');
  }

  asignarEvaluadores(propuestaId: number | null, evaluadores: Evaluador[]): void {
    if (propuestaId === null) {
      alert('Por favor ingrese el ID de la propuesta.');
      return;
    }
    if (evaluadores.length < this.minEvaluadores) {
      alert(`Se requieren al menos ${this.minEvaluadores} evaluadores.`);
      return;
    }
    this.evaluacionService.asignarEvaluadores(propuestaId, evaluadores);
    this.evaluadores = this.evaluacionService.obtenerEvaluadores(propuestaId);
    alert('Evaluadores asignados correctamente.');
  }

  guardarEvaluacion(evaluacion: Evaluacion): void {
    this.evaluacionService.guardarEvaluacion(evaluacion);
  }

  consolidarResultados(propuestaId: number): void {
    this.conceptoConsolidado = this.evaluacionService.consolidarResultados(propuestaId);
  }

  notificarEvaluacion(propuestaId: number): void {
    this.evaluacionService.notificarEvaluacion(propuestaId);
  }
}
