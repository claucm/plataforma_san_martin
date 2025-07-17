import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SemilleroStats {
  facultad: string;
  sede: string;
  programa: string;
  totalSemilleros: number;
  totalParticipantes: number;
  totalProyectos: number;
  totalProductos: number;
  productosPorTipologia: { [tipologia: string]: number };
  presupuestoTotal: number;
  productosPorParticipante: { participante: string; tipoProducto: string; cantidad: number }[];
  nivelFormacionParticipantes: { nivel: string; cantidad: number }[];
  participantesNacionales: number;
  participantesInternacionales: number;
}

@Component({
  selector: 'app-semilleros-investigacion',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './semilleros-investigacion.component.html',
  styleUrls: ['./semilleros-investigacion.component.css']
})
export class SemillerosInvestigacionComponent implements OnInit {
  facultades: string[] = ['Facultad de Ingeniería', 'Facultad de Ciencias Sociales', 'Facultad de Medicina'];
  sedes: string[] = ['Bogotá', 'Cali', 'Pasto', 'Puerto Colombia', 'Sabaneta'];
  programas: string[] = ['Ingeniería Civil', 'Sociología', 'Medicina General'];

  selectedFacultad: string = '';
  selectedSede: string = '';
  selectedPrograma: string = '';

  stats: SemilleroStats = {
    facultad: 'Todas',
    sede: 'Todas',
    programa: 'Todos',
    totalSemilleros: 0,
    totalParticipantes: 0,
    totalProyectos: 0,
    totalProductos: 0,
    productosPorTipologia: {},
    presupuestoTotal: 0,
    productosPorParticipante: [],
    nivelFormacionParticipantes: [],
    participantesNacionales: 0,
    participantesInternacionales: 0
  };

  constructor() {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    // Mock data for demonstration
    this.stats = {
      facultad: this.selectedFacultad || 'Todas',
      sede: this.selectedSede || 'Todas',
      programa: this.selectedPrograma || 'Todos',
      totalSemilleros: 12,
      totalParticipantes: 150,
      totalProyectos: 30,
      totalProductos: 45,
      productosPorTipologia: {
        'Artículo': 20,
        'Libro': 10,
        'Capítulo de libro': 15
      },
      presupuestoTotal: 5000000,
      productosPorParticipante: [
        { participante: 'Juan Pérez', tipoProducto: 'Artículo', cantidad: 5 },
        { participante: 'María Gómez', tipoProducto: 'Libro', cantidad: 2 }
      ],
      nivelFormacionParticipantes: [
        { nivel: 'Pregrado', cantidad: 50 },
        { nivel: 'Maestría', cantidad: 70 },
        { nivel: 'Doctorado', cantidad: 30 }
      ],
      participantesNacionales: 120,
      participantesInternacionales: 30
    };
  }

  onFilterChange(): void {
    // Reload stats based on filters - for now just reload mock data
    this.loadStats();
  }
}
