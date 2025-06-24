import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ColombiaMapComponent } from './colombia-map.component';

interface ProductOverYear {
  year: number;
  value: number;
  faculty: string;
}

interface Trend {
  name: string;
  value: number;
  color?: string;
}

interface Stats {
  distinctions: number;
  seedbeds: number;
  researchGroups: number;
  researchProjects: number;
  researchProducts: number;
  trends: Trend[];
  productsOverYears: ProductOverYear[];
  mapTooltip?: {
    image: string;
    programs: number;
  };
}

interface Sede {
  id: number;
  nombre: string;
  propuestas: number;
  productos: number;
  proyectos: number;
  facultades: Facultad[];
}

interface Facultad {
  id: number;
  nombre: string;
  programas: number;
}

const MOCK_STATS = {
  Bogotá: {
    distinctions: 25,
    seedbeds: 60,
    researchGroups: 12,
    researchProjects: 34,
    researchProducts: 12,
    trends: [
      { name: 'Ciencias', value: 45, color: '#3b82f6' },
      { name: 'Medicina', value: 29, color: '#10b981' },
      { name: 'Ciencias Económicas', value: 18, color: '#8b5cf6' }
    ],
    productsOverYears: [
      { year: 2020, value: 10, faculty: 'Ciencias' },
      { year: 2021, value: 15, faculty: 'Ingeniería' },
      { year: 2022, value: 20, faculty: 'Salud' },
      { year: 2023, value: 25, faculty: 'Ciencias' },
      { year: 2024, value: 30, faculty: 'Ingeniería' },
      { year: 2025, value: 35, faculty: 'Salud' },
      { year: 2026, value: 40, faculty: 'Ciencias' }
    ],
    mapTooltip: {
      image: 'bogota.png',
      programs: 10
    }
  },
  Cali: {
    distinctions: 15,
    seedbeds: 40,
    researchGroups: 8,
    researchProjects: 20,
    researchProducts: 8,
    trends: [
      { name: 'Educación', value: 30, color: '#f97316' },
      { name: 'Derecho', value: 20, color: '#ef4444' }
    ],
    productsOverYears: [
      { year: 2020, value: 5, faculty: 'Educación' },
      { year: 2021, value: 10, faculty: 'Derecho' },
      { year: 2022, value: 15, faculty: 'Educación' },
      { year: 2023, value: 20, faculty: 'Derecho' },
      { year: 2024, value: 25, faculty: 'Educación' },
      { year: 2025, value: 30, faculty: 'Derecho' },
      { year: 2026, value: 35, faculty: 'Educación' }
    ],
    mapTooltip: {
      image: 'cali.jpg',
      programs: 8
    }
  },
  Pasto: {
    distinctions: 10,
    seedbeds: 30,
    researchGroups: 6,
    researchProjects: 15,
    researchProducts: 7,
    trends: [
      { name: 'Agronomía', value: 25, color: '#34d399' },
      { name: 'Medicina', value: 15, color: '#60a5fa' }
    ],
    productsOverYears: [
      { year: 2020, value: 3, faculty: 'Agronomía' },
      { year: 2021, value: 6, faculty: 'Medicina' },
      { year: 2022, value: 9, faculty: 'Agronomía' },
      { year: 2023, value: 12, faculty: 'Medicina' },
      { year: 2024, value: 15, faculty: 'Agronomía' },
      { year: 2025, value: 18, faculty: 'Medicina' },
      { year: 2026, value: 21, faculty: 'Agronomía' }
    ],
    mapTooltip: {
      image: 'pasto.jpg',
      programs: 7
    }
  },
  'Puerto Colombia': {
    distinctions: 8,
    seedbeds: 20,
    researchGroups: 5,
    researchProjects: 10,
    researchProducts: 5,
    trends: [
      { name: 'Ingeniería', value: 20, color: '#f87171' },
      { name: 'Ciencias Sociales', value: 10, color: '#60a5fa' }
    ],
    productsOverYears: [
      { year: 2020, value: 2, faculty: 'Ingeniería' },
      { year: 2021, value: 4, faculty: 'Ciencias Sociales' },
      { year: 2022, value: 6, faculty: 'Ingeniería' },
      { year: 2023, value: 8, faculty: 'Ciencias Sociales' },
      { year: 2024, value: 10, faculty: 'Ingeniería' },
      { year: 2025, value: 12, faculty: 'Ciencias Sociales' },
      { year: 2026, value: 14, faculty: 'Ingeniería' }
    ],
    mapTooltip: {
      image: 'puerto_colombia.jpg',
      programs: 5
    }
  },
  Sabaneta: {
    distinctions: 12,
    seedbeds: 25,
    researchGroups: 7,
    researchProjects: 18,
    researchProducts: 9,
    trends: [
      { name: 'Administración', value: 22, color: '#fbbf24' },
      { name: 'Economía', value: 18, color: '#ef4444' }
    ],
    productsOverYears: [
      { year: 2020, value: 4, faculty: 'Administración' },
      { year: 2021, value: 8, faculty: 'Economía' },
      { year: 2022, value: 12, faculty: 'Administración' },
      { year: 2023, value: 16, faculty: 'Economía' },
      { year: 2024, value: 20, faculty: 'Administración' },
      { year: 2025, value: 24, faculty: 'Economía' },
      { year: 2026, value: 28, faculty: 'Administración' }
    ],
    mapTooltip: {
      image: 'sabaneta.jpg',
      programs: 9
    }
  }
};

@Component({
  selector: 'app-investigacion-dashboard',
  templateUrl: './investigacion-dashboard.component.html',
  styleUrls: ['./investigacion-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, ColombiaMapComponent]
})
export class InvestigacionDashboardComponent {
  mockStats = MOCK_STATS;
  locations = Object.keys(MOCK_STATS);
  selectedCity: string = 'Bogotá';

  cityImageMap: Record<string, string> = {
    'Bogotá': 'bogota.png',
    'Cali': 'cali.png',
    'Pasto': 'pasto.png',
    'Puerto Colombia': 'puerto_colombia.png',
    'Sabaneta': 'sabaneta.png'
  };

  sedes: { id: number; nombre: string; propuestas: number; productos: number; proyectos: number; coordenadas: [number, number]; facultades: { id: number; nombre: string; programas: number; }[]; }[] = [
    {
      id: 1,
      nombre: 'Bogotá',
      propuestas: 25,
      productos: 12,
      proyectos: 34,
      coordenadas: [4.7110, -74.0721] as [number, number],
      facultades: [
        { id: 1, nombre: 'Ciencias', programas: 10 },
        { id: 2, nombre: 'Ingeniería', programas: 15 },
        { id: 3, nombre: 'Salud', programas: 12 }
      ]
    },
    {
      id: 2,
      nombre: 'Cali',
      propuestas: 15,
      productos: 8,
      proyectos: 20,
      coordenadas: [3.4516, -76.5320] as [number, number],
      facultades: [
        { id: 4, nombre: 'Educación', programas: 12 },
        { id: 5, nombre: 'Derecho', programas: 10 }
      ]
    },
    {
      id: 3,
      nombre: 'Pasto',
      propuestas: 10,
      productos: 7,
      proyectos: 15,
      coordenadas: [1.2136, -77.2811] as [number, number],
      facultades: [
        { id: 6, nombre: 'Agronomía', programas: 8 },
        { id: 7, nombre: 'Medicina', programas: 7 }
      ]
    },
    {
      id: 4,
      nombre: 'Puerto Colombia',
      propuestas: 8,
      productos: 5,
      proyectos: 10,
      coordenadas: [10.9639, -74.7964] as [number, number],
      facultades: [
        { id: 8, nombre: 'Ingeniería', programas: 6 },
        { id: 9, nombre: 'Ciencias Sociales', programas: 4 }
      ]
    },
    {
      id: 5,
      nombre: 'Sabaneta',
      propuestas: 12,
      productos: 9,
      proyectos: 18,
      coordenadas: [6.1511, -75.6111] as [number, number],
      facultades: [
        { id: 10, nombre: 'Administración', programas: 7 },
        { id: 11, nombre: 'Economía', programas: 5 }
      ]
    }
  ];


  sedeSeleccionada: Sede | null = null;
  facultadSeleccionada: Facultad | null = null;

  constructor() {
    this.setSelectedCity('Bogotá');
  }

  seleccionarSede(sede: Sede): void {
    this.sedeSeleccionada = sede;
    this.facultadSeleccionada = null;
    this.selectedCity = sede.nombre;
  }

  seleccionarFacultad(facultad: Facultad): void {
    this.facultadSeleccionada = facultad;
  }

  getProductosTotales(): number {
    return this.sedeSeleccionada ? this.sedeSeleccionada.productos : 0;
  }

  getProyectosTotales(): number {
    return this.sedeSeleccionada ? this.sedeSeleccionada.proyectos : 0;
  }

  getDistincionesTotales(): number {
    return this.sedeSeleccionada ? this.sedeSeleccionada.propuestas : 0;
  }

  getSemillerosTotales(): number {
    return this.sedeSeleccionada ? this.sedeSeleccionada.productos : 0;
  }

  getGruposTotales(): number {
    return this.sedeSeleccionada ? this.sedeSeleccionada.proyectos : 0;
  }

  getTendencias(): Trend[] {
    if (!this.sedeSeleccionada) return [];
    const stats = this.mockStats[this.sedeSeleccionada.nombre as keyof typeof MOCK_STATS];
    return stats ? stats.trends : [];
  }

  getProductosPorAno(): ProductOverYear[] {
    if (!this.sedeSeleccionada) return [];
    const stats = this.mockStats[this.sedeSeleccionada.nombre as keyof typeof MOCK_STATS];
    return stats ? stats.productsOverYears : [];
  }

  get chartData() {
    const products = this.getProductosPorAno();
    return {
      labels: products.map(p => p.year.toString()),
      datasets: [
        {
          label: 'Productos de Investigación',
          data: products.map(p => p.value),
          backgroundColor: '#3b82f6'
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  setSelectedCity(city: string): void {
    const sede = this.sedes.find(s => s.nombre === city);
    if (sede) {
      this.seleccionarSede(sede);
    }
  }
}
