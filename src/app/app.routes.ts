
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

//Gestión de usuarios
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { RolesUsuarioComponent } from './roles-usuario/roles-usuario.component';

//Investigación
import { AperturaConvocatoriaComponent } from './investigacion/apertura-convocatoria/apertura-convocatoria.component';
import { RegistroProyectoComponent } from './investigacion/registro-proyecto/registro-proyecto.component';
import { ActasInicioComponent } from './investigacion/actas-inicio/actas-inicio.component';

// Tablero de Indicadores - Formación
import { OfertaAcademicaComponent } from './TableroDeIndicadores/formacion/oferta-academica/oferta-academica.component';
import { EspecializacionesMedicasComponent } from './TableroDeIndicadores/formacion/especializaciones-medicas/especializaciones-medicas.component';
import { TotalProgramasComponent } from './TableroDeIndicadores/formacion/total-programas/total-programas.component';
import { ProgramasInactivosComponent } from './TableroDeIndicadores/formacion/programas-inactivos/programas-inactivos.component';
import { ProgramasModalidadComponent } from './TableroDeIndicadores/formacion/programas-modalidad/programas-modalidad.component';
import { RegistroProgramasComponent } from './TableroDeIndicadores/formacion/registro-programas/registro-programas.component';
import { PlanesEstudioComponent } from './TableroDeIndicadores/formacion/planes-estudio/planes-estudio.component';

// Tablero de Indicadores - Estudiantes
import { TotalEstudiantesComponent } from './TableroDeIndicadores/estudiantes/total-estudiantes/total-estudiantes.component';
import { PorProgramaComponent } from './TableroDeIndicadores/estudiantes/por-programa/por-programa.component';
import { DesercionComponent } from './TableroDeIndicadores/estudiantes/desercion/desercion.component';
import { BecasComponent } from './TableroDeIndicadores/estudiantes/becas/becas.component';
import { NivelInglesComponent } from './TableroDeIndicadores/estudiantes/nivel-ingles/nivel-ingles.component';
import { PorCreditosComponent } from './TableroDeIndicadores/estudiantes/por-creditos/por-creditos.component';
import { DobleProgramaComponent } from './TableroDeIndicadores/estudiantes/doble-programa/doble-programa.component';
import { PremedicoComponent } from './TableroDeIndicadores/estudiantes/premedico/premedico.component';

// Tablero de Indicadores - Profesores
import { TotalProfesoresComponent } from './TableroDeIndicadores/profesores/total-profesores/total-profesores.component';
import { InstructoresPracticaComponent } from './TableroDeIndicadores/profesores/instructores-practica/instructores-practica.component';
import { DistribucionDocentesComponent } from './TableroDeIndicadores/profesores/distribucion-docentes/distribucion-docentes.component';
import { DistribucionDemograficaComponent } from './TableroDeIndicadores/profesores/distribucion-demografica/distribucion-demografica.component';
import { DistincionesComponent } from './TableroDeIndicadores/profesores/distinciones/distinciones.component';
import { DedicacionDocentesComponent } from './TableroDeIndicadores/profesores/dedicacion-docentes/dedicacion-docentes.component';
import { HistoricoComponent } from './TableroDeIndicadores/profesores/historico/historico.component';

// Tablero de Indicadores - Evaluación Profesores
import { DocentesEvaluadosComponent } from './TableroDeIndicadores/EvaluacionProfesores/docentes-evaluados/docentes-evaluados.component';
import { DocentesNoEvaluadosComponent } from './TableroDeIndicadores/EvaluacionProfesores/docentes-no-evaluados/docentes-no-evaluados.component';
import { CalificacionesComponent } from './TableroDeIndicadores/EvaluacionProfesores/calificaciones/calificaciones.component';
import { HistoricosComponent } from './TableroDeIndicadores/EvaluacionProfesores/historicos/historicos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'modificar-usuario', component: ModificarUsuarioComponent },
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent },
  { path: 'roles-usuario', component: RolesUsuarioComponent },
  { path: 'apertura-convocatoria', component: AperturaConvocatoriaComponent },
  { path: 'registro-proyecto', component: RegistroProyectoComponent  },
  { path: 'actas-inicio', component: ActasInicioComponent  },

    // Formación routes
    { path: 'indicadores/oferta-academica', component: OfertaAcademicaComponent },
    { path: 'indicadores/especializaciones-medicas', component: EspecializacionesMedicasComponent },
    { path: 'indicadores/programas-total', component: TotalProgramasComponent },
    { path: 'indicadores/programas-inactivos', component: ProgramasInactivosComponent },
    { path: 'indicadores/programas-modalidad', component: ProgramasModalidadComponent },
    { path: 'indicadores/registro-programas', component: RegistroProgramasComponent },
    { path: 'indicadores/planes-estudio', component: PlanesEstudioComponent },

    // Estudiantes routes
    { path: 'indicadores/estudiantes-total', component: TotalEstudiantesComponent },
    { path: 'indicadores/estudiantes-programa', component: PorProgramaComponent },
    { path: 'indicadores/desercion', component: DesercionComponent },
    { path: 'indicadores/becas', component: BecasComponent },
    { path: 'indicadores/ingles', component: NivelInglesComponent },
    { path: 'indicadores/creditos', component: PorCreditosComponent },
    { path: 'indicadores/doble-programa', component: DobleProgramaComponent },
    { path: 'indicadores/premedico', component: PremedicoComponent },

    // Profesores routes
    { path: 'indicadores/profesores-total', component: TotalProfesoresComponent },
    { path: 'indicadores/instructores-practica', component: InstructoresPracticaComponent },
    { path: 'indicadores/distribucion-docentes', component: DistribucionDocentesComponent },
    { path: 'indicadores/distribucion-demografica', component: DistribucionDemograficaComponent },
    { path: 'indicadores/distinciones-docentes', component: DistincionesComponent },
    { path: 'indicadores/dedicacion-docentes', component: DedicacionDocentesComponent },
    { path: 'indicadores/historico-profesores', component: HistoricoComponent },

    // Evaluación Profesores routes
    { path: 'indicadores/docentes-evaluados', component: DocentesEvaluadosComponent },
    { path: 'indicadores/docentes-no-evaluados', component: DocentesNoEvaluadosComponent },
    { path: 'indicadores/calificacion-evaluaciones', component: CalificacionesComponent },
    { path: 'indicadores/historico-evaluaciones', component: HistoricosComponent },
];


