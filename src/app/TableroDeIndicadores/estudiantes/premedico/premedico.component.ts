import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-premedico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './premedico.component.html',
  styleUrl: './premedico.component.css'
})
export class PremedicoComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedPeriodo: string = '2024-1';

  estudiantes = [
    { sede: 'Bogotá', facultad: 'Medicina', programa: 'Premédico', cantidad: 120, estado: 'Activo', semestre: '1' },
    { sede: 'Medellín', facultad: 'Medicina', programa: 'Premédico', cantidad: 85, estado: 'Activo', semestre: '1' },
    { sede: 'Cali', facultad: 'Medicina', programa: 'Premédico', cantidad: 65, estado: 'Activo', semestre: '1' }
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

    this.createDistribucionSedeChart();
    this.createTendenciaInscripcionChart();
  }

  private createDistribucionSedeChart(): void {
    const ctx = document.getElementById('distribucionSedeChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Bogotá', 'Medellín', 'Cali'],
        datasets: [{
          data: [120, 85, 65],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución por Sede'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createTendenciaInscripcionChart(): void {
    const ctx = document.getElementById('tendenciaInscripcionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'Estudiantes Inscritos',
          data: [220, 250, 270],
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Tendencia de Inscripción'
          }
        },
        scales: {
          y: {
            beginAtZero: true
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

  get totalEstudiantes() {
    return this.filteredEstudiantes.reduce((sum, e) => sum + e.cantidad, 0);
  }
}
