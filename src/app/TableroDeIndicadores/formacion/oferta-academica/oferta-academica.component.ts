import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-oferta-academica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oferta-academica.component.html',
  styleUrl: './oferta-academica.component.css'
})
export class OfertaAcademicaComponent implements OnInit, AfterViewInit {
  totalProgramas: number = 65;
  programasPregrado: number = 30;
  programasPosgrado: number = 35;
  programasNuevos: number = 5;

  programas = [
    {
      nombre: 'Ingeniería de Sistemas',
      facultad: 'Ingeniería',
      nivel: 'Pregrado',
      duracion: 10,
      cupos: 60,
      inscritos: 45,
      estado: 'Activo'
    },
    // Add more sample data
  ];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createCharts();
    }, 1000);
  }

  createCharts() {
    const ofertaAcademicaChart = new Chart('ofertaAcademicaChart', {
      type: 'bar',
      data: {
        labels: ['Ingeniería', 'Medicina', 'Derecho', 'Ciencias Económicas'],
        datasets: [{
          label: 'Programas Ofertados',
          data: [15, 20, 12, 18],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ofertaAcademicaTendenciasChart = new Chart('ofertaAcademicaTendenciasChart', {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Total Programas',
          data: [50, 55, 58, 62, 65],
          borderColor: 'rgba(153, 102, 255, 1)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Activo': return 'bg-success';
      case 'Inactivo': return 'bg-danger';
      case 'Pendiente': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }
}
