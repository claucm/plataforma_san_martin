import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-programas-modalidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programas-modalidad.component.html',
  styleUrl: './programas-modalidad.component.css'
})
export class ProgramasModalidadComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedModalidad: string = '';
  selectedNivel: string = '';
  selectedFacultad: string = '';
  selectedEstado: string = '';

  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];

  totalProgramas: number = 45;
  programasPresenciales: number = 25;
  programasVirtuales: number = 12;
  programasHibridos: number = 8;

  programas = [
    {
      nombre: 'Ingeniería de Sistemas',
      facultad: 'Ingeniería',
      nivel: 'Pregrado',
      modalidad: 'Presencial',
      estudiantes: 250,
      docentes: 20,
      estado: 'Activo'
    },
    // Add more sample data
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initializeCharts();
      }, 1000);
    }
  }

  private initializeCharts(): void {
    if (this.charts.length > 0) {
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
    }

    this.createModalidadChart();
    this.createTendenciaChart();
  }

  private createModalidadChart(): void {
    const ctx = document.getElementById('modalidadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Presencial', 'Virtual', 'Híbrido'],
        datasets: [{
          data: [this.programasPresenciales, this.programasVirtuales, this.programasHibridos],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    this.charts.push(chart);
  }

  private createTendenciaChart(): void {
    const ctx = document.getElementById('tendenciaChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Presencial',
            data: [20, 22, 23, 24, 25],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          },
          {
            label: 'Virtual',
            data: [5, 7, 9, 10, 12],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1
          },
          {
            label: 'Híbrido',
            data: [2, 4, 6, 7, 8],
            borderColor: 'rgba(255, 206, 86, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    this.charts.push(chart);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Activo': return 'bg-success';
      case 'En Desarrollo': return 'bg-warning';
      case 'Inactivo': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  get filteredProgramas() {
    return this.programas.filter(prog => {
      return (!this.selectedModalidad || prog.modalidad === this.selectedModalidad) &&
             (!this.selectedNivel || prog.nivel === this.selectedNivel) &&
             (!this.selectedFacultad || prog.facultad === this.selectedFacultad) &&
             (!this.selectedEstado || prog.estado === this.selectedEstado);
    });
  }
}
