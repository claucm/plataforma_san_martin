import { Injectable } from '@angular/core';
import { Evaluador } from '../models/evaluador.model';
import { Evaluacion } from '../models/evaluacion.model';
import { ConceptoConsolidado } from '../models/concepto-consolidado.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionProyectosService {
  private evaluadores: Evaluador[] = [];
  private evaluaciones: Evaluacion[] = [];
  private conceptosConsolidados: ConceptoConsolidado[] = [];

  constructor() { }

  // Asignación de evaluadores
  asignarEvaluadores(propuestaId: number, evaluadores: Evaluador[]): void {
    // Implementar lógica para asignar evaluadores a una propuesta
    evaluadores.forEach(e => {
      if (!this.evaluadores.find(ev => ev.id === e.id)) {
        this.evaluadores.push(e);
      }
    });
  }

  obtenerEvaluadores(propuestaId: number): Evaluador[] {
    // Retornar evaluadores asignados a la propuesta
    return this.evaluadores;
  }

  // Gestión de evaluaciones
  guardarEvaluacion(evaluacion: Evaluacion): void {
    const index = this.evaluaciones.findIndex(e => e.id === evaluacion.id);
    if (index !== -1) {
      this.evaluaciones[index] = evaluacion;
    } else {
      this.evaluaciones.push(evaluacion);
    }
  }

  obtenerEvaluaciones(propuestaId: number): Evaluacion[] {
    return this.evaluaciones.filter(e => e.propuestaId === propuestaId);
  }

  // Consolidación de resultados
  consolidarResultados(propuestaId: number): ConceptoConsolidado | null {
    const evaluaciones = this.obtenerEvaluaciones(propuestaId);
    if (evaluaciones.length === 0) {
      return null;
    }

    let puntajeTotal = 0;
    evaluaciones.forEach(e => {
      e.criterios.forEach(c => {
        puntajeTotal += c.puntaje;
      });
    });

    const clasificacionFinal = puntajeTotal >= 80 ? 'aprobado' : 'no_aprobado';

    const concepto: ConceptoConsolidado = {
      propuestaId,
      puntajeTotal,
      clasificacionFinal,
      sugerenciaFinal: 'aceptar_sin_modificaciones',
      fechaConsolidacion: new Date()
    };

    this.conceptosConsolidados.push(concepto);
    return concepto;
  }

  obtenerConceptoConsolidado(propuestaId: number): ConceptoConsolidado | undefined {
    return this.conceptosConsolidados.find(c => c.propuestaId === propuestaId);
  }

  // Notificaciones y trazabilidad (simplificado)
  notificarEvaluacion(propuestaId: number): void {
    // Implementar lógica de notificación
    console.log(`Notificación enviada para la propuesta ${propuestaId}`);
  }
}
