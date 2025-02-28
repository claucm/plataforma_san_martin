import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatosBasicosFormComponent } from './datos-basicos-form/datos-basicos-form.component';

@Component({
  selector: 'app-proyectos-investigacion',
  templateUrl: './proyectos-investigacion.component.html',
  styleUrls: ['./proyectos-investigacion.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatosBasicosFormComponent]
})
export class ProyectosInvestigacionComponent {
  // Lista de proyectos de ejemplo
  proyectos = [
    { 
      nombre: 'Políticas Públicas', 
      codigo: 'XXXX', 
      estado: 'Ingreso', 
      seleccionado: false 
    }
  ];

  // Pestañas disponibles
  tabs = [
    'Datos básicos',
    'Entidades',
    'Integrantes',
    'Presupuesto',
    'Legalización',
    'Seguimiento',
    'Productos',
    'Documentos',
    'Informe avance',
    'Informe final',
    'Solicitudes'
  ];

  proyectoSeleccionado: any = null;
  tabSeleccionada: string = this.tabs[0];

  // Método para seleccionar un proyecto
  seleccionarProyecto(proyecto: any) {
    if (proyecto.seleccionado) {
      this.proyectoSeleccionado = proyecto;
      this.tabSeleccionada = this.tabs[0];
    } else {
      this.proyectoSeleccionado = null;
      this.tabSeleccionada = this.tabs[0];
    }
  }

  // Método para cambiar entre pestañas
  seleccionarPestana(tab: string) {
    this.tabSeleccionada = tab;
  }

  // Método para manejar el envío del formulario de datos básicos
  handleDatosBasicosSubmit(formData: any) {
    console.log('Datos básicos actualizados:', formData);
    // Aquí puedes agregar la lógica para guardar los datos
    // Por ejemplo, llamar a un servicio
    if (this.proyectoSeleccionado) {
      // Actualizar el proyecto seleccionado con los nuevos datos
      this.proyectoSeleccionado = {
        ...this.proyectoSeleccionado,
        ...formData
      };

      // Actualizar el proyecto en la lista
      const index = this.proyectos.findIndex(p => p.codigo === this.proyectoSeleccionado.codigo);
      if (index !== -1) {
        this.proyectos[index] = this.proyectoSeleccionado;
      }
    }
  }

  // Método para verificar si una pestaña está activa
  isPestanaActiva(tab: string): boolean {
    return this.tabSeleccionada === tab;
  }

  // Método para limpiar la selección
  limpiarSeleccion() {
    this.proyectoSeleccionado = null;
    this.tabSeleccionada = this.tabs[0];
    this.proyectos.forEach(proyecto => proyecto.seleccionado = false);
  }
}
