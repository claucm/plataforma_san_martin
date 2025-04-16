import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-por-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './por-programa.component.html',
  styleUrl: './por-programa.component.css'
})
export class PorProgramaComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedNivel: string = '';
  selectedFacultad: string = '';
  selectedSede: string = '';
  selectedPeriodo: string = '2024-1';

  programas = [
    { nombre: 'Medicina', nivel: 'Pregrado', facultad: 'Medicina', sede: 'Bogotá', estudiantes: 850 },
    { nombre: 'Especialización en Cirugía', nivel: 'Posgrado', facultad: 'Medicina', sede: 'Bogotá', estudiantes: 120 },
    { nombre: 'Ingeniería Civil', nivel: 'Pregrado', facultad: 'Ingeniería', sede: 'Bogotá', estudiantes: 620 },
    { nombre: 'Maestría en Estructuras', nivel: 'Maestría', facultad: 'Ingeniería', sede: 'Medellín', estudiantes: 45 },
    { nombre: 'Doctorado en Ingeniería', nivel: 'Doctorado', facultad: 'Ingeniería', sede: 'Bogotá', estudiantes: 15 }
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

    this.createEstudiantesPorNivelChart();
    this.createEstudiantesPorProgramaChart();
  }

  private createEstudiantesPorNivelChart(): void {
    const ctx = document.getElementById('estudiantesNivelChart') as HTMLCanvasElement;
    if (!ctx) return;

    const niveles = ['Pregrado', 'Posgrado', 'Maestría', 'Doctorado'];
    const datos = [1470, 120, 45, 15];

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: niveles,
        datasets: [{
          data: datos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
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

  private createEstudiantesPorProgramaChart(): void {
    const ctx = document.getElementById('estudiantesProgramaChart') as HTMLCanvasElement;
    if (!ctx) return;

    const programasData = this.programas
      .sort((a, b) => b.estudiantes - a.estudiantes)
      .slice(0, 5);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: programasData.map(p => p.nombre),
        datasets: [{
          label: 'Número de Estudiantes',
          data: programasData.map(p => p.estudiantes),
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
            text: 'Estudiantes por Programa'
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

  get filteredProgramas() {
    return this.programas.filter(p => {
      return (!this.selectedNivel || p.nivel === this.selectedNivel) &&
             (!this.selectedFacultad || p.facultad === this.selectedFacultad) &&
             (!this.selectedSede || p.sede === this.selectedSede);
    });
  }

  get totalEstudiantes() {
    return this.filteredProgramas.reduce((sum, p) => sum + p.estudiantes, 0);
  }
}
