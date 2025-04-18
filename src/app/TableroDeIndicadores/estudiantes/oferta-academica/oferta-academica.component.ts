import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-oferta-academica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './oferta-academica.component.html',
  styleUrl: './oferta-academica.component.css'
})
export class OfertaAcademicaComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  private charts: Chart[] = [];

  // Form model properties
  selectedSede: string = '';
  selectedFacultad: string = '';
  selectedPrograma: string = '';
  selectedPeriodo: string = '2024-1';

  // Data properties
  programas = [
    { nombre: 'Medicina', facultad: 'Medicina', sede: 'Bogotá', estudiantes: 850, estado: 'Activo' },
    { nombre: 'Ingeniería Civil', facultad: 'Ingeniería', sede: 'Bogotá', estudiantes: 620, estado: 'Activo' },
    { nombre: 'Derecho', facultad: 'Derecho', sede: 'Medellín', estudiantes: 450, estado: 'Activo' },
    { nombre: 'Psicología', facultad: 'Ciencias Sociales', sede: 'Cali', estudiantes: 380, estado: 'Activo' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

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

    this.createProgramasPorFacultadChart();
    this.createProgramasPorSedeChart();
  }

  private createProgramasPorFacultadChart(): void {
    const ctx = document.getElementById('programasFacultadChart') as HTMLCanvasElement;
    if (!ctx) return;

    const facultades = this.getFacultadesData();
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: facultades.map(f => f.nombre),
        datasets: [{
          label: 'Programas por Facultad',
          data: facultades.map(f => f.programas),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Programas por Facultad'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createProgramasPorSedeChart(): void {
    const ctx = document.getElementById('programasSedeChart') as HTMLCanvasElement;
    if (!ctx) return;

    const sedes = this.getSedesData();
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: sedes.map(s => s.nombre),
        datasets: [{
          data: sedes.map(s => s.programas),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Programas por Sede'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private getFacultadesData() {
    return [
      { nombre: 'Medicina', programas: 3 },
      { nombre: 'Ingeniería', programas: 5 },
      { nombre: 'Derecho', programas: 2 },
      { nombre: 'Ciencias Sociales', programas: 4 }
    ];
  }

  private getSedesData() {
    return [
      { nombre: 'Bogotá', programas: 8 },
      { nombre: 'Medellín', programas: 4 },
      { nombre: 'Cali', programas: 2 }
    ];
  }

  get filteredProgramas() {
    return this.programas.filter(p => {
      return (!this.selectedSede || p.sede === this.selectedSede) &&
             (!this.selectedFacultad || p.facultad === this.selectedFacultad) &&
             (!this.selectedPrograma || p.nombre === this.selectedPrograma);
    });
  }
}