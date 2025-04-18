import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-total-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './total-profesores.component.html',
  styleUrl: './total-profesores.component.css'
})
export class TotalProfesoresComponent implements OnInit, AfterViewInit {
  selectedFacultad: string = '';
  selectedTipo: string = '';
  selectedNivel: string = '';
  selectedPeriodo: string = '2024-1';

  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];

  totalProfesores: number = 250;
  profesoresTiempoCompleto: number = 150;
  profesoresDoctorado: number = 80;
  profesoresNuevos: number = 15;

  profesores = [
    {
      nombre: 'Juan Pérez',
      facultad: 'Medicina',
      tipoContrato: 'Tiempo Completo',
      nivelAcademico: 'Doctorado',
      antiguedad: 5,
      asignaturas: 3,
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
    const distribucionChart = new Chart('distribucionChart', {
      type: 'bar',
      data: {
        labels: this.facultades,
        datasets: [{
          label: 'Profesores por Facultad',
          data: [80, 60, 50, 60],
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

    const nivelAcademicoChart = new Chart('nivelAcademicoChart', {
      type: 'pie',
      data: {
        labels: ['Doctorado', 'Maestría', 'Especialización'],
        datasets: [{
          data: [80, 120, 50],
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
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Activo': return 'bg-success';
      case 'Inactivo': return 'bg-danger';
      case 'Licencia': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  get filteredProfesores() {
    return this.profesores.filter(prof => {
      return (!this.selectedFacultad || prof.facultad === this.selectedFacultad) &&
             (!this.selectedTipo || prof.tipoContrato === this.selectedTipo) &&
             (!this.selectedNivel || prof.nivelAcademico === this.selectedNivel);
    });
  }
}
