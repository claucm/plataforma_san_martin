import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-registro-programas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-programas.component.html',
  styleUrl: './registro-programas.component.css'
})
export class RegistroProgramasComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedPeriodo: string = '2024-1';
  selectedFacultad: string = '';
  selectedNivel: string = '';
  selectedEstado: string = '';

  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];

  totalRegistros: number = 35;
  registrosCompletados: number = 20;
  registrosPendientes: number = 10;
  registrosRechazados: number = 5;

  registros = [
    {
      programa: 'Ingeniería de Software',
      facultad: 'Ingeniería',
      nivel: 'Pregrado',
      fechaRegistro: '2024-02-15',
      responsable: 'Juan Pérez',
      observaciones: 'Pendiente revisión documentación',
      estado: 'Pendiente'
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

    this.createEstadoChart();
    this.createPeriodoChart();
  }

  private createEstadoChart(): void {
    const ctx = document.getElementById('estadoChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Registrado', 'Pendiente', 'Rechazado'],
        datasets: [{
          data: [this.registrosCompletados, this.registrosPendientes, this.registrosRechazados],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 99, 132, 0.7)'
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

  private createPeriodoChart(): void {
    const ctx = document.getElementById('periodoChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'Registros por Periodo',
          data: [28, 32, 35],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.charts.push(chart);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Registrado': return 'bg-success';
      case 'Pendiente': return 'bg-warning';
      case 'Rechazado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  get filteredRegistros() {
    return this.registros.filter(reg => {
      return (!this.selectedFacultad || reg.facultad === this.selectedFacultad) &&
             (!this.selectedNivel || reg.nivel === this.selectedNivel) &&
             (!this.selectedEstado || reg.estado === this.selectedEstado);
    });
  }
}
