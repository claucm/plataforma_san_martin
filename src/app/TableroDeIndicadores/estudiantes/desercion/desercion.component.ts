import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';

@Component({
  selector: 'app-desercion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desercion.component.html',
  styleUrl: './desercion.component.css'
})
export class DesercionComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.createHistoricalChart();
        this.createProgramChart();
        this.createCohorteChart();
      }, 100);
    }
  }

  createHistoricalChart() {
    const ctx = document.getElementById('desercionHistoricaChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const data = this.getHistoricalData();
    
    // Calculate trend line
    const x = data.map((d, i) => i);
    const y = data.map(d => d.y);
    const regression = new SimpleLinearRegression(x, y);
    
    const trendLineData = x.map(xVal => ({
      x: data[xVal].x,
      y: regression.predict(xVal)
    }));

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Deserción',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          showLine: true // Add line connecting points
        },
        {
          label: 'Línea de Tendencia',
          data: trendLineData,
          type: 'line',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderDash: [5, 5],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Periodo'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasa de Deserción (%)'
            }
          }
        }
      }
    });
  }

  createProgramChart() {
    const ctx = document.getElementById('desercionProgramaChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Medicina',
          data: this.getProgramData('Medicina'),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          showLine: true
        },
        {
          label: 'Enfermería',
          data: this.getProgramData('Enfermería'),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          showLine: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Semestre'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasa de Deserción (%)'
            }
          }
        }
      }
    });
  }

  createCohorteChart() {
    const ctx = document.getElementById('desercionCohorteChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Cohorte 2023-1',
          data: this.getCohorteData('2023-1'),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          showLine: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Semestre'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasa de Deserción (%)'
            }
          }
        }
      }
    });
  }

  // Sample data methods
  private getHistoricalData() {
    return [
      { x: '2023-01', y: 8.5 },
      { x: '2023-02', y: 9.2 },
      { x: '2023-03', y: 7.8 },
      { x: '2023-04', y: 8.1 },
      { x: '2023-05', y: 7.5 },
      { x: '2023-06', y: 8.3 }
    ];
  }

  private getProgramData(programa: string) {
    return programa === 'Medicina' ? [
      { x: 1, y: 6.5 },
      { x: 2, y: 7.2 },
      { x: 3, y: 6.8 }
    ] : [
      { x: 1, y: 8.5 },
      { x: 2, y: 9.2 },
      { x: 3, y: 8.8 }
    ];
  }

  private getCohorteData(cohorte: string) {
    return [
      { x: 1, y: 5.5 },
      { x: 2, y: 6.2 },
      { x: 3, y: 7.8 }
    ];
  }
}
