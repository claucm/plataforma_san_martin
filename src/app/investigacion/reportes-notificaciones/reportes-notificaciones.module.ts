import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneracionReportesComponent } from './generacion-reportes.component';
import { NotificacionesComponent } from './notificaciones.component';
import { ReportesNotificacionesComponent } from './reportes-notificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesNotificacionesComponent,
    children: [
      { path: '', redirectTo: 'generacion-reportes', pathMatch: 'full' },
      { path: 'generacion-reportes', component: GeneracionReportesComponent },
      { path: 'notificaciones', component: NotificacionesComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeneracionReportesComponent,
    NotificacionesComponent,
    ReportesNotificacionesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ReportesNotificacionesModule { }
