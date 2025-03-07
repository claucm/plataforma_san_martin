
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
{ path: 'proyeccion-social', component: ProyeccionSocialComponent }

];


