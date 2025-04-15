import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosDeExtensionComponent } from './servicios-de-extension/servicios-de-extension.component';
import { AreaTrabajoComponent } from './area-trabajo/area-trabajo.component';
import { CicloVitalComponent } from './ciclo-vital/ciclo-vital.component';
import { EntidadNacionalComponent } from './entidad-nacional/entidad-nacional.component';
import { FuenteInternacionalComponent } from './fuente-internacional/fuente-internacional.component';
import { FuenteNacionalComponent } from './fuente-nacional/fuente-nacional.component';
import { OtrasEntidadesComponent } from './otras-entidades/otras-entidades.component';
import { PoblacionCondicionComponent } from './poblacion-condicion/poblacion-condicion.component';
import { PoblacionGrupoComponent } from './poblacion-grupo/poblacion-grupo.component';




@Component({
  selector: 'app-servicios-extension',
  standalone: true,
  imports: [
    CommonModule,
    ServiciosDeExtensionComponent,
    AreaTrabajoComponent,
    CicloVitalComponent,
    EntidadNacionalComponent,
    FuenteInternacionalComponent,
    FuenteNacionalComponent,
    OtrasEntidadesComponent,
    PoblacionCondicionComponent,
    PoblacionGrupoComponent
   
   
  ],
  templateUrl: './servicios-extension.component.html',
  styleUrls: ['./servicios-extension.component.css']
})
export class ServiciosExtensionComponent {}
