import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatosBasicosFormComponent } from './datos-basicos-form/datos-basicos-form.component';
import { LineasFormComponent } from './lineas-form/lineas-form.component';
import { IntegrantesFormComponent } from './integrantes-form/integrantes-form.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';

interface GrupoInvestigacion {
  id?: number;
  nombre: string;
  categoria: string;
  estado: string;
  seleccionado?: boolean;
  // Campos adicionales para datos básicos
  codigoFUSM?: string;
  fechaCreacion?: Date;
  clasificacion?: string;
  fechaClasificacion?: Date;
  codigoMinciencias?: string;
  linkGrupLac?: string;
  institucion?: string;
  descripcion?: string;
  observaciones?: string;
}

@Component({
  selector: 'app-gestion-ginvestigacion',
  standalone: true,
  imports: [
     CommonModule,
     FormsModule, 
     DatosBasicosFormComponent, 
     LineasFormComponent, 
     IntegrantesFormComponent,
     ProductosFormComponent],
  templateUrl: './gestion-ginvestigacion.component.html',
  styleUrls: ['./gestion-ginvestigacion.component.css']
})
export class GestionGinvestigacionComponent {
  // Datos de ejemplo
  grupos: GrupoInvestigacion[] = [
    { 
      nombre: 'Políticas Públicas', 
      categoria: 'A1', 
      estado: 'Activo', 
      seleccionado: false 
    }
  ];

  // Pestañas disponibles
  tabs = [
    'Datos básicos',
    'Línea de investigación',
    'Integrantes',
    'Productos, proyectos y semilleros',
    'Vínculos externos',
    'Redes',
    'Documentos',
    'Solicitudes'
  ];

  grupoSeleccionado: GrupoInvestigacion | null = null;
  tabSeleccionada: string = this.tabs[0];

  seleccionarGrupo(grupo: GrupoInvestigacion) {
    if (grupo.seleccionado) {
      this.grupoSeleccionado = grupo;
      this.tabSeleccionada = this.tabs[0];
    } else {
      this.grupoSeleccionado = null;
    }
  }

  seleccionarPestana(tab: string) {
    this.tabSeleccionada = tab;
  }

  handleDatosBasicosSubmit(formData: any): void {
    if (this.grupoSeleccionado) {
      // Actualizar datos del grupo
      const grupoActualizado: GrupoInvestigacion = {
        ...this.grupoSeleccionado,
        ...formData
      };

      // Actualizar el grupo en la lista
      const index = this.grupos.findIndex(g => g.id === grupoActualizado.id);
      if (index !== -1) {
        this.grupos[index] = grupoActualizado;
        this.grupoSeleccionado = grupoActualizado;
      }

      console.log('Grupo actualizado:', grupoActualizado);
    }
  }

  //mÉTODO PARA GUARDAR LA LÍNEA DE INVESTIGACIÓN
  handleLineasSubmit(formData: any): void {
    if (this.grupoSeleccionado) {
      console.log('Línea de investigación guardada:', formData);
      // Aquí puedes agregar la lógica para guardar la línea
    }
  }

  //Metodo para guardar el integrante
  handleIntegrantesSubmit(formData: any): void {
    if (this.grupoSeleccionado) {
      console.log('Integrante guardado:', formData);
      // Aquí puedes agregar la lógica para guardar el integrante
    }
  }

  //Metodo para guardar los productos
  handleProductosSubmit(formData: any): void {
    if (this.grupoSeleccionado) {
      console.log('Productos guardados:', formData);
      // Aquí puedes agregar la lógica para guardar los productos
    }
  }
  
  //FORMULARIOS PESTAÑA PRODUCTOS, PROYECTOS Y SEMILLEROS
  //Metodo para guardar el proyecto
  handleProyectoSubmit(formData: any) {
    console.log('Proyecto guardado:', formData);
    // Aquí puedes agregar la lógica para guardar el proyecto
  }

  // Método para limpiar la selección
  limpiarSeleccion() {
    this.grupos.forEach(grupo => grupo.seleccionado = false);
    this.grupoSeleccionado = null;
    this.tabSeleccionada = this.tabs[0];
  }

  // Método para verificar si una pestaña está activa
  isPestanaActiva(tab: string): boolean {
    return this.tabSeleccionada === tab;
  }
}
