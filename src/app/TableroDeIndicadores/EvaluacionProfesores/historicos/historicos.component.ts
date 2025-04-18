import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-historicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historicos.component.html',
  styleUrl: './historicos.component.css'
})
export class HistoricosComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedYear: string = '2024';
  selectedPeriodo: string = '1';
  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';

  programas: string[] = ['Medicina', 'Ingeniería Civil', 'Derecho'];

  registrosHistoricos = [
    {
      periodo: '2024-1',
      facultad: 'Medicina',
      programa: 'Medicina',
      docentesEvaluados: 45,
      promedio: 4.5,
      mejorEvaluacion: 4.9
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

    this.createTendenciaChart();
    this.createFacultadChart();
  }

  private createTendenciaChart(): void {
    const ctx = document.getElementById('tendenciaChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'Promedio General',
          data: [4.2, 4.3, 4.4, 4.7, 4.5],
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 3.5,
            max: 5.0
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createFacultadChart(): void {
    const ctx = document.getElementById('facultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Medicina', 'Ingeniería', 'Derecho'],
        datasets: [{
          label: 'Promedio por Facultad',
          data: [4.6, 4.4, 4.5],
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
            min: 3.5,
            max: 5.0
          }
        }
      }
    });
    this.charts.push(chart);
  }

  get filteredRegistros() {
    return this.registrosHistoricos.filter(r => {
      const periodoCompleto = `${this.selectedYear}-${this.selectedPeriodo}`;
      return (!periodoCompleto || r.periodo === periodoCompleto) &&
             (!this.selectedFacultad || r.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || r.programa === this.selectedPrograma);
    });
  }
}
