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

interface Tarea {
  nombre: string;
  inicio: number; // month index 0-6
  duracion: number; // in months
  color: string;
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

  filterSede: string = '';
  filterFacultad: string = '';
  filterPrograma: string = '';

  filterCodigo: string = '';
  filterNombre: string = '';
  filterEstado: string = '';
  filterFechaInicio: string = '';
  filterFechaFin: string = '';

  sedes: string[] = ['Sede 1', 'Sede 2', 'Sede 3']; // Example sedes, replace with real data
  facultades: string[] = ['Facultad 1', 'Facultad 2', 'Facultad 3']; // Example facultades
  programas: string[] = ['Programa 1', 'Programa 2', 'Programa 3']; // Example programas

  filteredProyectos: Proyecto[] = [];

  @ViewChild('projectModal') projectModalRef!: ElementRef;
  private projectModalInstance: any;

  @ViewChild('ganttModal') ganttModalRef!: ElementRef;
  private ganttModalInstance: any;

  private isBrowser: boolean;

  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

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
    this.filteredProyectos = this.proyectos;
  }

  applyFilters() {
    this.filteredProyectos = this.proyectos.filter(proyecto => {
      const matchSede = this.filterSede ? proyecto.areaConocimiento === this.filterSede : true;
      const matchFacultad = this.filterFacultad ? proyecto.areaConocimiento === this.filterFacultad : true;
      const matchPrograma = this.filterPrograma ? proyecto.areaConocimiento === this.filterPrograma : true;

      const matchCodigo = proyecto.codigo.toLowerCase().includes(this.filterCodigo.toLowerCase());
      const matchNombre = proyecto.titulo.toLowerCase().includes(this.filterNombre.toLowerCase());
      const matchEstado = proyecto.estado.toLowerCase().includes(this.filterEstado.toLowerCase());

      const fechaInicioFilter = this.filterFechaInicio ? new Date(this.filterFechaInicio) : null;
      const fechaFinFilter = this.filterFechaFin ? new Date(this.filterFechaFin) : null;
      const proyectoFechaInicio = new Date(proyecto.fechaInicio);
      const proyectoFechaFin = new Date(proyecto.fechaFin);

      const matchFechaInicio = fechaInicioFilter ? proyectoFechaInicio >= fechaInicioFilter : true;
      const matchFechaFin = fechaFinFilter ? proyectoFechaFin <= fechaFinFilter : true;

      return matchSede && matchFacultad && matchPrograma && matchCodigo && matchNombre && matchEstado && matchFechaInicio && matchFechaFin;
    });
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

  get tareas(): Tarea[] {
    if (!this.selectedProyecto) {
      return [];
    }
    const colors = ['#b39ddb', '#80cbc4', '#e6b86a', '#f48fb1', '#90caf9', '#ef9a9a', '#a5d6a7'];
    return this.selectedProyecto.cronograma.map((tarea, index) => {
      const inicioDate = new Date(tarea.fechaInicio);
      const finDate = new Date(tarea.fechaFin);
      const inicio = inicioDate.getMonth(); // 0-based month index
      // Calculate duration in months, rounding up partial months
      let duracion = finDate.getMonth() - inicio + 1;
      if (duracion <= 0) duracion = 1;
      return {
        nombre: tarea.nombre,
        inicio,
        duracion,
        color: colors[index % colors.length]
      };
    });
  }

  getColor(index: number): string {
    const colors = ['#b39ddb', '#80cbc4', '#e6b86a', '#f48fb1', '#90caf9', '#ef9a9a', '#a5d6a7'];
    return colors[index % colors.length];
  }

  getStartColumn(tarea: Tarea): number {
    return tarea.inicio + 2; // +2 because grid columns start at 2 (1 is for task label)
  }

  getEndColumn(tarea: Tarea): number {
    return tarea.inicio + tarea.duracion + 2; // +2 to cover the month span correctly
  }
}