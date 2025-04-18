import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-instructores-practica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructores-practica.component.html',
  styleUrl: './instructores-practica.component.css'
})
export class InstructoresPracticaComponent implements OnInit, AfterViewInit {
  selectedPrograma: string = '';
  selectedArea: string = '';
  selectedHospital: string = '';
  selectedPeriodo: string = '2024-1';

  programas: string[] = ['Medicina', 'Enfermería', 'Fisioterapia'];
  areas: string[] = ['Clínica', 'Quirúrgica', 'Pediatría', 'Ginecología'];
  hospitales: string[] = ['Hospital San José', 'Clínica Santa María', 'Hospital Infantil'];

  totalInstructores: number = 120;
  totalHospitales: number = 15;
  totalEstudiantes: number = 450;
  promedioEvaluacion: number = 4.5;

  instructores = [
    {
      nombre: 'María González',
      programa: 'Medicina',
      area: 'Clínica',
      hospital: 'Hospital San José',
      estudiantes: 8,
      evaluacion: 4.8,
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
    const areasChart = new Chart('areasChart', {
      type: 'pie',
      data: {
        labels: this.areas,
        datasets: [{
          data: [40, 30, 25, 25],
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
        maintainAspectRatio: false
      }
    });

    const evaluacionChart = new Chart('evaluacionChart', {
      type: 'bar',
      data: {
        labels: this.hospitales,
        datasets: [{
          label: 'Evaluación Promedio',
          data: [4.5, 4.3, 4.7],
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
            beginAtZero: true,
            max: 5
          }
        }
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

  get filteredInstructores() {
    return this.instructores.filter(inst => {
      return (!this.selectedPrograma || inst.programa === this.selectedPrograma) &&
             (!this.selectedArea || inst.area === this.selectedArea) &&
             (!this.selectedHospital || inst.hospital === this.selectedHospital);
    });
  }
}
