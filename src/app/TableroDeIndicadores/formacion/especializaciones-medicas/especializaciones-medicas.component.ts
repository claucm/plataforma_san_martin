import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-especializaciones-medicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especializaciones-medicas.component.html',
  styleUrl: './especializaciones-medicas.component.css'
})
export class EspecializacionesMedicasComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  selectedSede: string = '';
  selectedArea: string = '';
  selectedDuracion: string = '';
  selectedEstado: string = '';

  sedes: string[] = ['Bogotá', 'Medellín', 'Cali'];
  areas: string[] = ['Cirugía', 'Medicina Interna', 'Pediatría', 'Ginecología'];

  totalEspecializaciones: number = 25;
  totalResidentes: number = 180;
  cuposDisponibles: number = 45;
  conveniosActivos: number = 12;

  especializaciones = [
    {
      nombre: 'Cirugía General',
      area: 'Cirugía',
      sede: 'Bogotá',
      duracion: 4,
      cupos: 10,
      residentes: 35,
      hospitales: 4,
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

    this.createDistribucionChart();
    this.createResidentesChart();
  }

  private createDistribucionChart(): void {
    const ctx = document.getElementById('distribucionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.areas,
        datasets: [{
          data: [8, 6, 6, 5],
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

  private createResidentesChart(): void {
    const ctx = document.getElementById('residentesChart') as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Residentes por Año',
          data: [150, 160, 165, 175, 180],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
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
      case 'En Proceso': return 'bg-warning';
      case 'Inactivo': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  get filteredEspecializaciones() {
    return this.especializaciones.filter(esp => {
      return (!this.selectedSede || esp.sede === this.selectedSede) &&
             (!this.selectedArea || esp.area === this.selectedArea) &&
             (!this.selectedDuracion || esp.duracion.toString() === this.selectedDuracion) &&
             (!this.selectedEstado || esp.estado === this.selectedEstado);
    });
  }
}
