import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-planes-estudio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planes-estudio.component.html',
  styleUrl: './planes-estudio.component.css'
})
export class PlanesEstudioComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedNivel: string = '';
  selectedEstado: string = '';

  totalPlanes: number = 25;
  planesActivos: number = 18;
  planesEnRevision: number = 5;
  planesActualizados: number = 8;

  planesEstudio = [
    {
      programa: 'Medicina',
      facultad: 'Medicina',
      nivel: 'Pregrado',
      version: '2023-2',
      fechaActualizacion: '2023-07-15',
      creditos: 240,
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

    this.createDistribucionChart();
    this.createEstadoChart();
  }

  private createDistribucionChart(): void {
    const ctx = document.getElementById('distribucionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Medicina', 'Ingeniería', 'Derecho'],
        datasets: [{
          data: [8, 12, 5],
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

  private createEstadoChart(): void {
    const ctx = document.getElementById('estadoChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Activo', 'En Revisión', 'Inactivo'],
        datasets: [{
          label: 'Planes por Estado',
          data: [18, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
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
      case 'En Revisión': return 'bg-warning';
      case 'Inactivo': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  get filteredPlanes() {
    return this.planesEstudio.filter(plan => {
      return (!this.selectedFacultad || plan.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || plan.programa === this.selectedPrograma) &&
             (!this.selectedNivel || plan.nivel === this.selectedNivel) &&
             (!this.selectedEstado || plan.estado === this.selectedEstado);
    });
  }
}
