import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  fechaInicio: string;
  fechaFin: string;
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
export class ProyectosComponent implements OnInit, AfterViewInit {
  proyectos: Proyecto[] = [];
  selectedProyecto: Proyecto | null = null;

  @ViewChild('projectModal') projectModalRef!: ElementRef;
  private projectModalInstance: any;

  @ViewChild('ganttModal') ganttModalRef!: ElementRef;
  private ganttModalInstance: any;

  private isBrowser: boolean;

  constructor(private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
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
        fechaInicio: '2025-01-01',
        fechaFin: '2025-07-31',
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

  async ngAfterViewInit() {
    if (this.isBrowser) {
      const { Modal } = await import('bootstrap');
      this.projectModalInstance = new Modal(this.projectModalRef.nativeElement);
      this.ganttModalInstance = new Modal(this.ganttModalRef.nativeElement);
    }
  }

  openModal(proyecto: Proyecto) {
    if (this.isBrowser) {
      this.selectedProyecto = proyecto;
      this.projectModalInstance.show();
    }
  }

  closeModal() {
    if (this.isBrowser) {
      this.projectModalInstance.hide();
      this.selectedProyecto = null;
    }
  }

  openGanttModal() {
    if (this.isBrowser) {
      this.ganttModalInstance.show();
    }
  }

  closeGanttModal() {
    if (this.isBrowser) {
      this.ganttModalInstance.hide();
    }
  }

  calculateDuration(fechaInicio: string, fechaFin: string): number {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // duration in days
  }

  // Check if task overlaps the given month (1-based month number)
  isTaskInMonth(tarea: { fechaInicio: string; fechaFin: string }, month: number): boolean {
    const taskStart = new Date(tarea.fechaInicio);
    const taskEnd = new Date(tarea.fechaFin);
    const monthStart = new Date(taskStart.getFullYear(), month - 1, 1);
    const monthEnd = new Date(taskStart.getFullYear(), month, 0); // last day of month
    return taskStart <= monthEnd && taskEnd >= monthStart;
  }

  // Return a color for the task based on index
  getColor(index: number): string {
    const colors = ['#9b59b6', '#1abc9c', '#f39c12', '#e67e22', '#3498db', '#2ecc71', '#e74c3c'];
    return colors[index % colors.length];
  }

  // Calculate grid column start based on task start month (1-based)
  getStartColumn(tarea: { fechaInicio: string }): number {
    const date = new Date(tarea.fechaInicio);
    return date.getMonth() + 2; // +2 because grid columns start at 2 (1 is for task label)
  }

  // Calculate grid column end based on task end month (1-based)
  getEndColumn(tarea: { fechaFin: string }): number {
    const date = new Date(tarea.fechaFin);
    return date.getMonth() + 3; // +3 to cover the month span correctly
  }
}
