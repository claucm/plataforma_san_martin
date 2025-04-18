import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-docentes-no-evaluados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docentes-no-evaluados.component.html',
  styleUrl: './docentes-no-evaluados.component.css'
})
export class DocentesNoEvaluadosComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedPeriodo: string = '2024-1';

  totalNoEvaluados: number = 25;
  porcentajeNoEvaluados: number = 15;
  facultadMayorPorcentaje: string = 'Ingeniería';
  programaMayorPorcentaje: string = 'Ing. Civil';

  docentes = [
    {
      nombre: 'Juan Pérez',
      facultad: 'Ingeniería',
      programa: 'Ing. Civil',
      vinculacion: 'Tiempo Completo',
      ultimaEvaluacion: '2023-1'
    },
    // Add more sample data as needed
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

    this.createFacultadChart();
    this.createTendenciaChart();
  }

  private createFacultadChart(): void {
    const ctx = document.getElementById('facultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingeniería', 'Medicina', 'Derecho'],
        datasets: [{
          label: 'Docentes No Evaluados',
          data: [10, 8, 7],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
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

  private createTendenciaChart(): void {
    const ctx = document.getElementById('tendenciaChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'No Evaluados por Periodo',
          data: [30, 28, 25],
          borderColor: 'rgba(54, 162, 235, 1)',
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

  get filteredDocentes() {
    return this.docentes.filter(d => {
      return (!this.selectedSede || d.facultad.includes(this.selectedSede)) &&
             (!this.selectedFacultad || d.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || d.programa === this.selectedPrograma);
    });
  }
}
