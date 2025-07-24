import { ProjectStatus } from './project-status.model';
import { CostCenter } from './cost-center.model';
import { ProjectType } from './project-type.model';
import { ResearchGroup } from './research-group.model';

export interface Project {
  id?: number;
  codigo?: string;
  titulo: string;
  description?: string;
  fechaCreacion?: string;
  origen?: string;
  convocatoria?: string;
  duracionProrrogas?: number;
  fechaInicio?: string;
  startDate: Date;
  fechaTerminacion?: string;
  endDate: Date;
  cumplimiento?: number;
  codigoExterno?: string;
  investigacionFormativa?: boolean;
  interdisciplinario?: boolean;
  intergrupos?: boolean;
  monografias?: boolean;
  rolFUSM?: string;
  objetivoGeneral?: string;
  palabrasClave?: string;
  resumen?: string;
  observacionesGenerales?: string;
  cronogramaInicial?: {
    fechaInicio: string;
    fechaFin: string;
  };
  productosPendientes?: boolean;
  estado?: string;
  status?: ProjectStatus;
  costCenter?: CostCenter;
  projectType?: ProjectType;
  researchGroup?: ResearchGroup;
  createdAt?: Date;
}
