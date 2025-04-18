import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-distribucion-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribucion-docentes.component.html',
  styleUrl: './distribucion-docentes.component.css'
})
export class DistribucionDocentesComponent implements OnInit, AfterViewInit {
  private charts: Chart[] = [];

  selectedFacultad: string = '';
  selectedDepartamento: string = '';
  selectedCategoria: string = '';
  selectedPeriodo: string = '2024-1';

  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];
  departamentos: string[] = ['Ciencias Básicas', 'Sistemas', 'Clínicas Médicas', 'Derecho Público'];

  totalDocentes: number = 280;
  totalDepartamentos: number = 12;
  docentesTitulares: number = 85;
  ratioEstudiantes: number = 15;

  distribucion = [
    {
      departamento: 'Ciencias Básicas',
      facultad: 'Medicina',
      totalDocentes: 45,
      titulares: 15,
      asociados: 20,
      asistentes: 10,
      estudiantes: 600,
      ratio: 13.3
    },
    // Add more sample data
  ];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.charts.length > 0) {
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
    }

    requestAnimationFrame(() => {
      this.createCharts();
    });
  }

  private createCharts(): void {
    const distribucionCtx = document.getElementById('distribucionChart') as HTMLCanvasElement;
    const categoriaCtx = document.getElementById('categoriaChart') as HTMLCanvasElement;

    if (!distribucionCtx || !categoriaCtx) {
      console.error('Canvas elements not found');
      return;
    }

    try {
      const distribucionChart = new Chart(distribucionCtx, {
        type: 'bar',
        data: {
          labels: this.departamentos,
          datasets: [{
            label: 'Docentes por Departamento',
            data: [45, 35, 40, 30],
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
      this.charts.push(distribucionChart);

      const categoriaChart = new Chart(categoriaCtx, {
        type: 'pie',
        data: {
          labels: ['Titulares', 'Asociados', 'Asistentes'],
          datasets: [{
            data: [85, 120, 75],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
      this.charts.push(categoriaChart);
    } catch (error) {
      console.error('Error creating charts:', error);
    }
  }

  get filteredDistribucion() {
    return this.distribucion.filter(dist => {
      return (!this.selectedFacultad || dist.facultad === this.selectedFacultad) &&
             (!this.selectedDepartamento || dist.departamento === this.selectedDepartamento);
    });
  }
}
