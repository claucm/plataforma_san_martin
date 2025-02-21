import { Component } from '@angular/core';
import { ConveniosFormComponent } from '../convenios-form/convenios-form.component';
import { ConveniosDocenciaComponent } from '../convenios-docencia/convenios-docencia.component'; 
import { ComiteDocenciaComponent } from '../comite-docencia/comite-docencia.component';
import { PracticasProfesionalesComponent } from '../practicas-profesionales/practicas-profesionales.component';
import { FichaResumenComponent } from '../ficha-resumen/ficha-resumen.component';
import { ProyeccionSocialComponent } from '../proyeccion-social/proyeccion-social.component';

@Component({
  selector: 'app-practicas-pasantias',
  standalone: true,
  imports: [ConveniosFormComponent, ConveniosDocenciaComponent, ComiteDocenciaComponent, PracticasProfesionalesComponent, FichaResumenComponent, ProyeccionSocialComponent ], 
  templateUrl: './practicas-pasantias.component.html',
  styleUrls: ['./practicas-pasantias.component.css']
})
export class PracticasPasantiasComponent { }
