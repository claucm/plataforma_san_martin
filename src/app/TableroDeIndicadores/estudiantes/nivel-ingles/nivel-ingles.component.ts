import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-nivel-ingles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nivel-ingles.component.html',
  styleUrl: './nivel-ingles.component.css'
})
export class NivelInglesComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Increased timeout to ensure DOM is ready
      setTimeout(() => {
        this.initializeCharts();
      }, 300);
    }
  }

  private initializeCharts(): void {
    // Destroy existing charts if any
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];

    // Create new charts
    const distribucionChart = this.createDistribucionNivelChart();
    const certificacionesChart = this.createCertificacionesChart();

    if (distribucionChart) this.charts.push(distribucionChart);
    if (certificacionesChart) this.charts.push(certificacionesChart);
  }

  createDistribucionNivelChart(): Chart | null {
    const ctx = document.getElementById('distribucionNivelChart') as HTMLCanvasElement;
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['A1', 'A2', 'B1', 'B2', 'C1'],
        datasets: [{
          label: 'Estudiantes por Nivel',
          data: [45, 120, 180, 95, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
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
            text: 'Distribución por Nivel de Inglés'
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

  createCertificacionesChart(): Chart | null {
    const ctx = document.getElementById('certificacionesChart') as HTMLCanvasElement;
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['TOEFL', 'IELTS', 'Cambridge', 'Otros'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Distribución de Certificaciones'
          }
        }
      }
    });
  }

  // Sample data methods for future API integration
  private getNivelesData() {
    return [
      { nivel: 'A1', cantidad: 45 },
      { nivel: 'A2', cantidad: 120 },
      { nivel: 'B1', cantidad: 180 },
      { nivel: 'B2', cantidad: 95 },
      { nivel: 'C1', cantidad: 25 }
    ];
  }

  private getCertificacionesData() {
    return [
      { tipo: 'TOEFL', cantidad: 45 },
      { tipo: 'IELTS', cantidad: 30 },
      { tipo: 'Cambridge', cantidad: 15 },
      { tipo: 'Otros', cantidad: 10 }
    ];
  }
}
