import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doble-programa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doble-programa.component.html',
  styleUrl: './doble-programa.component.css'
})
export class DobleProgramaComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.createDistribucionFacultadChart();
        this.createTendenciaPeriodoChart();
      }, 100);
    }
  }

  createDistribucionFacultadChart() {
    const ctx = document.getElementById('distribucionFacultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingeniería', 'Medicina', 'Derecho', 'Ciencias', 'Economía'],
        datasets: [{
          label: 'Estudiantes en Doble Programa',
          data: [98, 75, 45, 15, 12],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribución por Facultad'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Estudiantes'
            }
          }
        }
      }
    });
  }

  createTendenciaPeriodoChart() {
    const ctx = document.getElementById('tendenciaPeriodoChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'Doble Programa',
          data: [180, 195, 210, 225, 245],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        },
        {
          label: 'Doble Titulación',
          data: [65, 70, 75, 80, 85],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tendencia por Periodo'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Estudiantes'
            }
          }
        }
      }
    });
  }

  // Sample data methods for future API integration
  private getFacultadData() {
    return [
      { facultad: 'Ingeniería', estudiantes: 98 },
      { facultad: 'Medicina', estudiantes: 75 },
      { facultad: 'Derecho', estudiantes: 45 },
      { facultad: 'Ciencias', estudiantes: 15 },
      { facultad: 'Economía', estudiantes: 12 }
    ];
  }

  private getTendenciaData() {
    return {
      doblePrograma: [180, 195, 210, 225, 245],
      dobleTitulacion: [65, 70, 75, 80, 85],
      periodos: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1']
    };
  }
}
