import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Proyecto {
  codigo: string;
  titulo: string;
  estado: string;
  areaConocimiento: string;
  caracteristicas: string;
  objetivoGeneral: string;
  objetivosEspecificos: string;
  resumen: string;
  investigadorPrincipal: {
    nroIdentificacion: string;
    nombresApellidos: string;
    horasDedicacion: number;
  };
  cronograma: { nombre: string; fechaInicio: string; fechaFin: string }[];
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  showModal: boolean = false;
  selectedProyecto: Proyecto | null = null;
  showGantt: boolean = false;

  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  ganttData: { name: string; start: number; end: number; color: string }[] = [];

  ngOnInit() {
    // Example project data
    this.proyectos = [
      {
        codigo: 'PYI-2025-01',
        titulo: 'Proyecto de Investigación Ejemplo',
        estado: 'Pendiente',
        areaConocimiento: 'Ingeniería',
        caracteristicas: 'Características del proyecto ejemplo',
        objetivoGeneral: 'Objetivo general ejemplo',
        objetivosEspecificos: 'Objetivos específicos ejemplo',
        resumen: 'Resumen del proyecto ejemplo',
        investigadorPrincipal: {
          nroIdentificacion: '123456789',
          nombresApellidos: 'Juan Pérez',
          horasDedicacion: 20
        },
        cronograma: [
          { nombre: 'Tarea 1', fechaInicio: '2025-01-01', fechaFin: '2025-02-15' },
          { nombre: 'Tarea 2', fechaInicio: '2025-02-01', fechaFin: '2025-04-30' },
          { nombre: 'Tarea 3', fechaInicio: '2025-03-01', fechaFin: '2025-04-15' },
          { nombre: 'Tarea 4', fechaInicio: '2025-04-01', fechaFin: '2025-05-31' },
          { nombre: 'Tarea 5', fechaInicio: '2025-05-01', fechaFin: '2025-06-30' },
          { nombre: 'Tarea 6', fechaInicio: '2025-06-15', fechaFin: '2025-07-31' },
          { nombre: 'Tarea 7', fechaInicio: '2025-07-01', fechaFin: '2025-07-31' }
        ]
      }
    ];
  }

  openModal(proyecto: Proyecto) {
    this.selectedProyecto = proyecto;
    this.showModal = true;
    this.showGantt = false;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProyecto = null;
    this.showGantt = false;
  }

  openGantt() {
    console.log('Opening Gantt modal...');
    this.showGantt = true;
    this.prepareGanttData();
  }

  prepareGanttData() {
    if (!this.selectedProyecto) return;

    const colors = ['#9c27b0', '#4caf50', '#ff9800', '#2196f3', '#e91e63', '#00bcd4', '#8bc34a'];

    this.ganttData = this.selectedProyecto.cronograma.map((act, index) => {
      const startMonth = new Date(act.fechaInicio).getMonth() + 1; // Months are 0-based
      const endMonth = new Date(act.fechaFin).getMonth() + 1;
      return {
        name: act.nombre,
        start: startMonth,
        end: endMonth + 1, // gridColumnEnd is exclusive
        color: colors[index % colors.length]
      };
    });
  }

  closeGantt() {
    this.showGantt = false;
  }

  calculateDuration(fechaInicio: string, fechaFin: string): number {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // duration in days
  }

  renderGanttChart() {
    try {
      if (!this.selectedProyecto) {
        console.warn('No proyecto selected for Gantt chart rendering.');
        return;
      }

      const anychart = (window as any).anychart;
      if (!anychart) {
        console.error('AnyChart library is not loaded.');
        return;
      }

      console.log('Rendering Gantt chart for proyecto:', this.selectedProyecto);

      // Prepare data for simpler Gantt chart (range bar chart style)
      const colors = ['#9c27b0', '#4caf50', '#ff9800', '#2196f3', '#e91e63', '#00bcd4', '#8bc34a'];
      const data = this.selectedProyecto.cronograma.map((act, index) => {
        return {
          x: act.nombre,
          low: new Date(act.fechaInicio).getTime(),
          high: new Date(act.fechaFin).getTime(),
          fill: colors[index % colors.length]
        };
      });

      // Create chart instance
      const chart = anychart.ganttProject();

      // Set chart title
      chart.title('Diagrama de Gantt - Cronograma');

      // Log container element and size
      const container = document.getElementById('ganttContainer');
      if (container) {
        console.log('Gantt container found:', container);
        console.log('Container size:', container.offsetWidth, 'x', container.offsetHeight);
      } else {
        console.warn('Gantt container not found');
      }

      // Set container
      chart.container('ganttContainer');

      // Set data
      chart.data(data);

      // Configure data grid columns: hide code column, show name and dates
      const dataGrid = chart.dataGrid();
      dataGrid.column(0).enabled(false);
      dataGrid.column(1).labels().hAlign('left').width(180);
      dataGrid.column(2).title('Fechas').width(150).labels().hAlign('center').format(() => {
        return '';
      });

      // Draw chart
      chart.draw();

      // Force redraw/resize
      chart.invalidate();
      chart.resize();

      console.log('Simplified Gantt chart rendered successfully.');
    } catch (error) {
      console.error('Error rendering simplified Gantt chart:', error);
    }
  }
}
