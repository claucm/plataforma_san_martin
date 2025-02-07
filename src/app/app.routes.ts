
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
import { ProyectosInvestigacionComponent } from './investigacion/proyectos-investigacion/proyectos-investigacion.component';
import { ConsultaTablasComponent } from './investigacion/consulta-tablas/consulta-tablas.component';
import { ModuloExtensionComponent } from './extension/modulo-extension/modulo-extension.component';


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
  { path: 'grupos-investigacion', component: GruposInvestigacionComponent },
  { path: 'proyectos-investigacion', component: ProyectosInvestigacionComponent },
  { path: 'consulta-tablas', component: ConsultaTablasComponent },
  { path: 'modulo-extension', component: ModuloExtensionComponent },

];


