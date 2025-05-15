
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
import { InvestigacionDashboardComponent } from './tablero-indicadores/investigacion-dashboard.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'modificar-usuario', component: ModificarUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'eliminar-usuario', component: EliminarUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'roles-usuario', component: RolesUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'apertura-convocatoria', component: AperturaConvocatoriaComponent, canActivate: [AuthGuard] },
    { path: 'registro-proyecto', component: RegistroProyectoComponent, canActivate: [AuthGuard] },
    { path: 'actas-inicio', component: ActasInicioComponent, canActivate: [AuthGuard] },
    { path: 'gestion-ginvestigacion', component: GestionGinvestigacionComponent, canActivate: [AuthGuard] },
    { path: 'grupos-investigacion', component: GruposInvestigacionComponent, canActivate: [AuthGuard] },
    { path: 'proyectos-investigacion', component: ProyectosInvestigacionComponent, canActivate: [AuthGuard] },
    { path: 'consulta-tablas', component: ConsultaTablasComponent, canActivate: [AuthGuard] },
    { path: 'modulo-extension', component: ModuloExtensionComponent, canActivate: [AuthGuard] },
    { path: 'practicas-pasantias', component: PracticasPasantiasComponent, canActivate: [AuthGuard] },
    { path: 'convenios-form', component: ConveniosFormComponent, canActivate: [AuthGuard] },
    { path: 'convenios-docencia', component: ConveniosDocenciaComponent, canActivate: [AuthGuard] },
    { path: 'comite-docencia', component: ComiteDocenciaComponent, canActivate: [AuthGuard] },
    { path: 'practicas-profesionales', component: PracticasProfesionalesComponent, canActivate: [AuthGuard] },
    { path: 'ficha-resumen', component: FichaResumenComponent, canActivate: [AuthGuard] },
    { path: 'proyeccion-social', component: ProyeccionSocialComponent, canActivate: [AuthGuard] },
    { path: 'caracterizacion-participantes', component: CaracterizacionParticipantesComponent, canActivate: [AuthGuard] },
    { path: 'servicios-extension', component: ServiciosExtensionComponent, canActivate: [AuthGuard] },
    { path: 'servicios-de-extension', component: ServiciosDeExtensionComponent, canActivate: [AuthGuard] },
    { path: 'area-trabajo', component: AreaTrabajoComponent, canActivate: [AuthGuard] },
    { path: 'ciclo-vital', component: CicloVitalComponent, canActivate: [AuthGuard] },
    { path: 'entidad-nacional', component: EntidadNacionalComponent, canActivate: [AuthGuard] },
    { path: 'participante', component: ParticipanteComponent, canActivate: [AuthGuard] },
    { path: 'fuente-internacional', component: FuenteInternacionalComponent, canActivate: [AuthGuard] },
    { path: 'fuente-nacional', component: FuenteNacionalComponent, canActivate: [AuthGuard] },
    { path: 'otras-entidades', component: OtrasEntidadesComponent, canActivate: [AuthGuard] },
    { path: 'poblacion-condicion', component: PoblacionCondicionComponent, canActivate: [AuthGuard] },
    { path: 'poblacion-grupo', component: PoblacionGrupoComponent, canActivate: [AuthGuard] },
    { path: 'educacion-continuada', component: EducacionContinuadaComponent, canActivate: [AuthGuard] },
    { path: 'tablero-indicadores/investigacion', component: InvestigacionDashboardComponent, canActivate: [AuthGuard] },
];


