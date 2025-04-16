import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-total-programas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './total-programas.component.html',
  styleUrl: './total-programas.component.css'
})
export class TotalProgramasComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedNivel: string = '';
  selectedYear: string = '2024';

  sedes: string[] = ['Bogotá', 'Medellín', 'Cali'];
  facultades: string[] = ['Medicina', 'Ingeniería', 'Derecho', 'Ciencias Económicas'];

  totalProgramas: number = 85;
  programasPregrado: number = 35;
  programasPosgrado: number = 50;
  programasNuevos: number = 8;

  programas = [
    {
      nombre: 'Medicina',
      facultad: 'Medicina',
      sede: 'Bogotá',
      nivel: 'Pregrado',
      estudiantes: 450,
      docentes: 45,
      anioInicio: 2010,
      estado: 'Activo'
    },
    // Add more sample data
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

    this.createFacultadChart();
    this.createEvolucionChart();
  }

  private createFacultadChart(): void {
    const ctx = document.getElementById('facultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.facultades,
        datasets: [{
          data: [25, 30, 15, 15],
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
    this.charts.push(chart);
  }

  private createEvolucionChart(): void {
    const ctx = document.getElementById('evolucionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Pregrado',
            data: [30, 31, 32, 34, 35],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          },
          {
            label: 'Posgrado',
            data: [40, 42, 45, 48, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    this.charts.push(chart);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Activo': return 'bg-success';
      case 'Inactivo': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  get filteredProgramas() {
    return this.programas.filter(prog => {
      return (!this.selectedSede || prog.sede === this.selectedSede) &&
             (!this.selectedFacultad || prog.facultad === this.selectedFacultad) &&
             (!this.selectedNivel || prog.nivel === this.selectedNivel);
    });
  }
}
