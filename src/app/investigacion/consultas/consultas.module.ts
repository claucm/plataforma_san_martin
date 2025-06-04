import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaProyectosComponent } from './consulta-proyectos.component';
import { ConsultaProductosComponent } from './consulta-productos.component';
import { ConsultaSemillerosComponent } from './consulta-semilleros.component';

const routes: Routes = [
  { path: 'proyectos', component: ConsultaProyectosComponent },
  { path: 'productos', component: ConsultaProductosComponent },
  { path: 'semilleros', component: ConsultaSemillerosComponent },
  { path: '', redirectTo: 'proyectos', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConsultaProyectosComponent,
    ConsultaProductosComponent,
    ConsultaSemillerosComponent
  ],
  exports: [RouterModule]
})
export class ConsultasModule { }
