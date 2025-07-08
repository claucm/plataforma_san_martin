import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { EvaluacionProyectosComponent } from './evaluacion-proyectos/evaluacion-proyectos.component';
import { ActasInicioComponent } from './actas-inicio/actas-inicio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProyectosComponent,
    EvaluacionProyectosComponent,
    ActasInicioComponent
  ],
  providers: [DatePipe]
})
export class InvestigacionModule { }
