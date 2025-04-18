import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-por-creditos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './por-creditos.component.html',
  styleUrl: './por-creditos.component.css'
})
export class PorCreditosComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedPeriodo: string = '2024-1';

  estudiantes = [
    { creditos: '12-16', cantidad: 450, facultad: 'Medicina', sede: 'Bogotá', programa: 'Medicina' },
    { creditos: '17-20', cantidad: 320, facultad: 'Ingeniería', sede: 'Bogotá', programa: 'Ingeniería Civil' },
    { creditos: '12-16', cantidad: 280, facultad: 'Derecho', sede: 'Medellín', programa: 'Derecho' },
    { creditos: '8-11', cantidad: 150, facultad: 'Ciencias', sede: 'Cali', programa: 'Física' }
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

    this.createDistribucionCreditosChart();
    this.createPromedioFacultadChart();
  }

  private createDistribucionCreditosChart(): void {
    const ctx = document.getElementById('distribucionCreditosChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['8-11', '12-16', '17-20', '21+'],
        datasets: [{
          label: 'Estudiantes por Rango de Créditos',
          data: [150, 730, 320, 80],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Estudiantes por Créditos'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createPromedioFacultadChart(): void {
    const ctx = document.getElementById('promedioFacultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias'],
        datasets: [{
          label: 'Promedio de Créditos',
          data: [18, 16, 15, 14],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Promedio de Créditos por Facultad'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  get filteredEstudiantes() {
    return this.estudiantes.filter(e => {
      return (!this.selectedSede || e.sede === this.selectedSede) &&
             (!this.selectedFacultad || e.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || e.programa === this.selectedPrograma);
    });
  }
}
