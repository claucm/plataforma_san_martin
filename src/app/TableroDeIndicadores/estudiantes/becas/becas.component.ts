import Chart from 'chart.js/auto';
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-becas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './becas.component.html',
  styleUrl: './becas.component.css'
})
export class BecasComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  createCharts() {
    // Gráfico de Distribución de Becas por Facultad
    const becasChart = new Chart('becasChart', {
      type: 'bar',
      data: {
        labels: ['Facultad de Ingeniería', 'Facultad de Psicología', 'Facultad de Ciencias Sociales'],
        datasets: [{
          label: 'Becas otorgadas',
          data: [500, 200, 300], // Datos de ejemplo
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Tendencias de Becas a lo largo del Tiempo
    const becasTendenciasChart = new Chart('becasTendenciasChart', {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Becas otorgadas',
          data: [50, 70, 80, 90, 120, 150], // Datos de ejemplo
          fill: false,
          borderColor: 'rgba(153, 102, 255, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
