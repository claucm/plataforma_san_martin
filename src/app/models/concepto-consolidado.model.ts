export interface ConceptoConsolidado {
  propuestaId: number;
  puntajeTotal: number;
  clasificacionFinal: 'aprobado' | 'aprobado_con_ajustes' | 'no_aprobado';
  sugerenciaFinal: 'aceptar_sin_modificaciones' | 'aceptar_con_modificaciones' | 'rechazar';
  razonesSugerencia?: string;
  fechaConsolidacion: Date;
}
