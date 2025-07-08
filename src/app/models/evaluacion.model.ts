export interface Evaluacion {
  id: number;
  propuestaId: number;
  evaluadorId: number;
  criterios: { criterio: string; puntaje: number; observacion?: string }[];
  estado: 'pendiente' | 'en_evaluacion' | 'evaluada';
  fechaEvaluacion?: Date;
  veredicto?: 'aceptar_sin_modificaciones' | 'aceptar_con_modificaciones' | 'rechazar';
  razonesVeredicto?: string;
}
