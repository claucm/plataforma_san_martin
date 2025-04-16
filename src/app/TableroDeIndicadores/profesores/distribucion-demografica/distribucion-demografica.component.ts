import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-distribucion-demografica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribucion-demografica.component.html',
  styleUrl: './distribucion-demografica.component.css'
})
export class DistribucionDemograficaComponent implements OnInit, AfterViewInit {
  private charts: Chart[] = [];

  selectedFacultad: string = '';
  selectedGenero: string = '';
  selectedRangoEdad: string = '';
  selectedPeriodo: string = '2024-1';

  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];

  edadPromedio: number = 45;
  porcentajeMujeres: number = 42;
  mayorGrupoEdad: string = '36-45';
  antiguedadMedia: number = 12;

  demografico = [
    {
      facultad: 'Medicina',
      rangoEdad: '36-45',
      total: 45,
      masculino: 25,
      femenino: 20,
      edadPromedio: 42,
      antiguedadMedia: 10
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
    const edadCtx = document.getElementById('edadChart') as HTMLCanvasElement;
    const generoFacultadCtx = document.getElementById('generoFacultadChart') as HTMLCanvasElement;

    if (!edadCtx || !generoFacultadCtx) {
      console.error('Canvas elements not found');
      return;
    }

    try {
      const edadChart = new Chart(edadCtx, {
        type: 'bar',
        data: {
          labels: ['25-35', '36-45', '46-55', '56+'],
          datasets: [{
            label: 'Distribución por Edad',
            data: [60, 85, 65, 40],
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
      this.charts.push(edadChart);

      const generoFacultadChart = new Chart(generoFacultadCtx, {
        type: 'bar',
        data: {
          labels: this.facultades,
          datasets: [
            {
              label: 'Masculino',
              data: [25, 35, 30, 28],
              backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
              label: 'Femenino',
              data: [20, 15, 20, 22],
              backgroundColor: 'rgba(255, 99, 132, 0.7)'
            }
          ]
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
      this.charts.push(generoFacultadChart);
    } catch (error) {
      console.error('Error creating charts:', error);
    }
  }

  get filteredDemografico() {
    return this.demografico.filter(demo => {
      return (!this.selectedFacultad || demo.facultad === this.selectedFacultad) &&
             (!this.selectedRangoEdad || demo.rangoEdad === this.selectedRangoEdad);
    });
  }
}
