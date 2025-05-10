
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
import { GruposInvestigacionComponent } from './investigacion/grupos-investigacion/grupos-investigacion.component';
import { GestionGinvestigacionComponent } from './investigacion/grupos/gestion-ginvestigacion/gestion-ginvestigacion.component';

import { ProyectosInvestigacionComponent } from './investigacion/proyectos-investigacion/proyectos-investigacion.component';
import { ConsultaTablasComponent } from './investigacion/consulta-tablas/consulta-tablas.component';
import { ModuloExtensionComponent } from './extension/modulo-extension/modulo-extension.component';

//Extensión
import { PracticasPasantiasComponent } from './extension/practicas/practicas-pasantias/practicas-pasantias.component';
import { ConveniosFormComponent } from './extension/practicas/convenios-form/convenios-form.component';
import { ConveniosDocenciaComponent } from './extension/practicas/convenios-docencia/convenios-docencia.component';
import { ComiteDocenciaComponent } from './extension/practicas/comite-docencia/comite-docencia.component';
import { PracticasProfesionalesComponent } from './extension/practicas/practicas-profesionales/practicas-profesionales.component';
import { FichaResumenComponent } from './extension/practicas/ficha-resumen/ficha-resumen.component';
import { ProyeccionSocialComponent } from './extension/practicas/proyeccion-social/proyeccion-social.component';

//Extension-servicios docentes
import { CaracterizacionParticipantesComponent } from './extension/servicios-docentes/caracterizacion-participantes/caracterizacion-participantes.component';
import { ServiciosExtensionComponent } from './extension/servicios-docentes/servicios-extension/servicios-extension.component';
import { ServiciosDeExtensionComponent } from './extension/servicios-docentes/servicios-extension/servicios-de-extension/servicios-de-extension.component';
import { AreaTrabajoComponent } from './extension/servicios-docentes/servicios-extension/area-trabajo/area-trabajo.component';
import { CicloVitalComponent } from './extension/servicios-docentes/servicios-extension/ciclo-vital/ciclo-vital.component';
import { EntidadNacionalComponent } from './extension/servicios-docentes/servicios-extension/entidad-nacional/entidad-nacional.component';
import { FuenteNacionalComponent } from './extension/servicios-docentes/servicios-extension/fuente-nacional/fuente-nacional.component';
import { ParticipanteComponent } from './extension/servicios-docentes/participante/participante.component';
import { FuenteInternacionalComponent } from './extension/servicios-docentes/servicios-extension/fuente-internacional/fuente-internacional.component';
import { OtrasEntidadesComponent } from './extension/servicios-docentes/servicios-extension/otras-entidades/otras-entidades.component';
import { PoblacionCondicionComponent } from './extension/servicios-docentes/servicios-extension/poblacion-condicion/poblacion-condicion.component';
import { PoblacionGrupoComponent } from './extension/servicios-docentes/servicios-extension/poblacion-grupo/poblacion-grupo.component';

//Educación continuada
import { EducacionContinuadaComponent } from './extension/educacion-continuada/educacion-continuada.component';

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
  { path: 'gestion-ginvestigacion', component: GestionGinvestigacionComponent },
  { path: 'grupos-investigacion', component: GruposInvestigacionComponent },
  { path: 'proyectos-investigacion', component: ProyectosInvestigacionComponent },
  { path: 'consulta-tablas', component: ConsultaTablasComponent },
  { path: 'modulo-extension', component: ModuloExtensionComponent },

{ path: 'practicas-pasantias', component: PracticasPasantiasComponent },
{ path: 'convenios-form', component: ConveniosFormComponent },
{ path: 'convenios-docencia', component: ConveniosDocenciaComponent },
{ path: 'comite-docencia', component: ComiteDocenciaComponent },
{ path: 'practicas-profesionales', component: PracticasProfesionalesComponent },
{ path: 'ficha-resumen', component: FichaResumenComponent },
{ path: 'proyeccion-social', component: ProyeccionSocialComponent },

//Extension-servicios docentes
{ path: 'caracterizacion-participantes', component: CaracterizacionParticipantesComponent },
{ path: 'servicios-extension', component: ServiciosExtensionComponent },
{ path: 'servicios-de-extension', component: ServiciosDeExtensionComponent },
{ path: 'area-trabajo', component: AreaTrabajoComponent },
{ path: 'ciclo-vital', component: CicloVitalComponent },
{ path: 'entidad-nacional', component: EntidadNacionalComponent },
{ path: 'participante', component: ParticipanteComponent },
{ path: 'fuente-internacional', component: FuenteInternacionalComponent },
{ path: 'participante', component: ParticipanteComponent },
{path: 'fuente-nacional', component: FuenteNacionalComponent},
{path: 'otras-entidades', component: OtrasEntidadesComponent},
{path: 'poblacion-condicion', component: PoblacionCondicionComponent},
{path: 'poblacion-grupo', component: PoblacionGrupoComponent},

//Educación continuada
 { path: 'educacion-continuada', component: EducacionContinuadaComponent },

];


