import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-docentes-evaluados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docentes-evaluados.component.html',
  styleUrl: './docentes-evaluados.component.css'
})
export class DocentesEvaluadosComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedPeriodo: string = '2024-1';

  docentes = [
    {
      nombre: 'Juan Pérez',
      facultad: 'Medicina',
      sede: 'Bogotá',
      programa: 'Medicina',
      vinculacion: 'Tiempo Completo',
      escalafon: 'Titular',
      formacion: 'Doctorado',
      area: 'Ciencias de la Salud',
      idiomas: ['Inglés', 'Francés'],
      edad: 45,
      genero: 'Masculino',
      antiguedad: 10,
      distinciones: ['Premio a la Excelencia', 'Investigador Senior']
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

    this.createVinculacionChart();
    this.createEscalafonChart();
    this.createFormacionChart();
    this.createGeneroEdadChart();
  }

  private createVinculacionChart(): void {
    const ctx = document.getElementById('vinculacionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const vinculaciones = ['Tiempo Completo', 'Medio Tiempo', 'Cátedra', 'Tiempo Parcial'];
    const datos = [45, 25, 20, 10];

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: vinculaciones,
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
            text: 'Distribución por Tipo de Vinculación'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createEscalafonChart(): void {
    const ctx = document.getElementById('escalafonChart') as HTMLCanvasElement;
    if (!ctx) return;

    const escalafones = ['Titular', 'Asociado', 'Asistente', 'Auxiliar'];
    const datos = [15, 25, 35, 25];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: escalafones,
        datasets: [{
          label: 'Docentes por Escalafón',
          data: datos,
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
            text: 'Distribución por Escalafón'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createFormacionChart(): void {
    const ctx = document.getElementById('formacionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const niveles = ['Doctorado', 'Maestría', 'Especialización', 'Pregrado'];
    const datos = [30, 40, 20, 10];

    const chart = new Chart(ctx, {
      type: 'doughnut',
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
            text: 'Nivel de Formación'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createGeneroEdadChart(): void {
    const ctx = document.getElementById('generoEdadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['25-35', '36-45', '46-55', '56+'],
        datasets: [
          {
            label: 'Masculino',
            data: [15, 25, 20, 10],
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Femenino',
            data: [20, 30, 15, 5],
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución por Género y Edad'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
    this.charts.push(chart);
  }

  get filteredDocentes() {
    return this.docentes.filter(d => {
      return (!this.selectedSede || d.sede === this.selectedSede) &&
             (!this.selectedFacultad || d.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || d.programa === this.selectedPrograma);
    });
  }
}