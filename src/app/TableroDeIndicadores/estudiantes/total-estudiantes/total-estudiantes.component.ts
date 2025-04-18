import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-total-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './total-estudiantes.component.html',
  styleUrl: './total-estudiantes.component.css'
})
export class TotalEstudiantesComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedPeriodo: string = '2024-1';
  selectedNivel: string = '';
  selectedPrograma: string = '';

  periodos = ['2023-1', '2023-2', '2024-1'];
  
  estudiantes = [
    { periodo: '2024-1', programa: 'Medicina', nivel: 'Pregrado', cantidad: 850 },
    { periodo: '2024-1', programa: 'Ingeniería Civil', nivel: 'Pregrado', cantidad: 620 },
    { periodo: '2024-1', programa: 'Maestría en Medicina', nivel: 'Posgrado', cantidad: 120 },
    { periodo: '2023-2', programa: 'Medicina', nivel: 'Pregrado', cantidad: 830 },
    { periodo: '2023-2', programa: 'Ingeniería Civil', nivel: 'Pregrado', cantidad: 600 },
    { periodo: '2023-1', programa: 'Medicina', nivel: 'Pregrado', cantidad: 800 },
    { periodo: '2023-1', programa: 'Ingeniería Civil', nivel: 'Pregrado', cantidad: 580 }
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

    this.createTendenciaMatriculaChart();
    this.createDistribucionNivelChart();
    this.createProgramasChart();
  }

  private createTendenciaMatriculaChart(): void {
    const ctx = document.getElementById('tendenciaMatriculaChart') as HTMLCanvasElement;
    if (!ctx) return;

    const datos = this.periodos.map(periodo => ({
      periodo,
      total: this.estudiantes
        .filter(e => e.periodo === periodo)
        .reduce((sum, e) => sum + e.cantidad, 0)
    }));

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: datos.map(d => d.periodo),
        datasets: [{
          label: 'Total Estudiantes',
          data: datos.map(d => d.total),
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
            text: 'Tendencia de Matrícula por Periodo'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createDistribucionNivelChart(): void {
    const ctx = document.getElementById('distribucionNivelChart') as HTMLCanvasElement;
    if (!ctx) return;

    const niveles = ['Pregrado', 'Posgrado'];
    const datos = niveles.map(nivel => ({
      nivel,
      total: this.estudiantes
        .filter(e => e.periodo === this.selectedPeriodo && e.nivel === nivel)
        .reduce((sum, e) => sum + e.cantidad, 0)
    }));

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: datos.map(d => d.nivel),
        datasets: [{
          data: datos.map(d => d.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución por Nivel de Formación'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createProgramasChart(): void {
    const ctx = document.getElementById('programasChart') as HTMLCanvasElement;
    if (!ctx) return;

    const programas = [...new Set(this.estudiantes.map(e => e.programa))];
    const datos = programas.map(programa => ({
      programa,
      total: this.estudiantes
        .filter(e => e.periodo === this.selectedPeriodo && e.programa === programa)
        .reduce((sum, e) => sum + e.cantidad, 0)
    }));

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datos.map(d => d.programa),
        datasets: [{
          label: 'Estudiantes por Programa',
          data: datos.map(d => d.total),
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
            text: 'Distribución por Programa'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  get filteredEstudiantes() {
    return this.estudiantes.filter(e => {
      return (!this.selectedPeriodo || e.periodo === this.selectedPeriodo) &&
             (!this.selectedNivel || e.nivel === this.selectedNivel) &&
             (!this.selectedPrograma || e.programa === this.selectedPrograma);
    });
  }

  get totalEstudiantes() {
    return this.filteredEstudiantes.reduce((sum, e) => sum + e.cantidad, 0);
  }
}
