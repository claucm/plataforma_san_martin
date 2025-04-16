import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-programas-inactivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programas-inactivos.component.html',
  styleUrl: './programas-inactivos.component.css'
})
export class ProgramasInactivosComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedNivel: string = '';
  selectedYear: string = '';

  totalInactivos: number = 15;
  inactivosUltimoAnio: number = 5;
  enProcesoInactivacion: number = 3;
  programasReactivados: number = 2;

  programas = [
    {
      nombre: 'Ingeniería Industrial',
      facultad: 'Ingeniería',
      sede: 'Bogotá',
      nivel: 'Pregrado',
      fechaInactivacion: '2023-12-15',
      motivo: 'Baja demanda',
      estudiantesActivos: 45,
      estado: 'Inactivo'
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

    this.createInactivacionesChart();
    this.createDistribucionChart();
  }

  private createInactivacionesChart(): void {
    const ctx = document.getElementById('inactivacionesChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Programas Inactivados',
          data: [3, 4, 2, 5, 1],
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    this.charts.push(chart);
  }

  private createDistribucionChart(): void {
    const ctx = document.getElementById('distribucionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ingeniería', 'Medicina', 'Derecho'],
        datasets: [{
          data: [6, 5, 4],
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

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Inactivo': return 'bg-danger';
      case 'En Proceso': return 'bg-warning';
      case 'Reactivado': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  get filteredProgramas() {
    return this.programas.filter(programa => {
      return (!this.selectedSede || programa.sede === this.selectedSede) &&
             (!this.selectedFacultad || programa.facultad === this.selectedFacultad) &&
             (!this.selectedNivel || programa.nivel === this.selectedNivel) &&
             (!this.selectedYear || programa.fechaInactivacion.includes(this.selectedYear));
    });
  }
}
