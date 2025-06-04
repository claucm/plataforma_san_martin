// Extracted and enriched mock data for dashboard functionality
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
}

interface Stats {
  distinctions: number;
  seedbeds: number;
  researchGroups: number;
  researchProjects: number;
  researchProducts: number;
  trends: Trend[];
  productsOverYears: ProductOverYear[];
}

const MOCK_STATS: Record<string, Stats> = {
  'Bogotá': {
    distinctions: 25,
    seedbeds: 60,
    researchGroups: 12,
    researchProjects: 34,
    researchProducts: 12,
    trends: [
      { name: 'Ciencias', value: 30 },
      { name: 'Ingeniería', value: 45 },
      { name: 'Salud', value: 25 },
    ],
    productsOverYears: [
      { year: 2021, value: 10, faculty: 'Ciencias' },
      { year: 2022, value: 15, faculty: 'Ingeniería' },
      { year: 2023, value: 20, faculty: 'Salud' },
    ]
  },
  'Cali': {
    distinctions: 12,
    seedbeds: 40,
    researchGroups: 8,
    researchProjects: 20,
    researchProducts: 6,
    trends: [
      { name: 'Educación', value: 40 },
      { name: 'Derecho', value: 30 },
      { name: 'Ambiental', value: 30 },
    ],
    productsOverYears: [
      { year: 2021, value: 7, faculty: 'Educación' },
      { year: 2022, value: 9, faculty: 'Derecho' },
      { year: 2023, value: 10, faculty: 'Ambiental' },
    ]
  },
  'Pasto': {
    distinctions: 10,
    seedbeds: 32,
    researchGroups: 7,
    researchProjects: 15,
    researchProducts: 5,
    trends: [
      { name: 'Turismo', value: 60 },
      { name: 'Medicina', value: 25 },
      { name: 'Ingeniería', value: 15 },
    ],
    productsOverYears: [
      { year: 2021, value: 5, faculty: 'Turismo' },
      { year: 2022, value: 6, faculty: 'Medicina' },
      { year: 2023, value: 7, faculty: 'Ingeniería' },
    ]
  },
  'Puerto Colombia': {
    distinctions: 5,
    seedbeds: 18,
    researchGroups: 4,
    researchProjects: 10,
    researchProducts: 3,
    trends: [
      { name: 'Ciencias del Mar', value: 50 },
      { name: 'Ambiental', value: 35 },
      { name: 'Salud', value: 15 },
    ],
    productsOverYears: [
      { year: 2021, value: 4, faculty: 'Ciencias del Mar' },
      { year: 2022, value: 5, faculty: 'Ambiental' },
      { year: 2023, value: 6, faculty: 'Salud' },
    ]
  },
  'Sabaneta': {
    distinctions: 15,
    seedbeds: 45,
    researchGroups: 9,
    researchProjects: 25,
    researchProducts: 8,
    trends: [
      { name: 'Ciencias Económicas', value: 55 },
      { name: 'Derecho', value: 30 },
      { name: 'Educación', value: 15 },
    ],
    productsOverYears: [
      { year: 2021, value: 6, faculty: 'Ciencias Económicas' },
      { year: 2022, value: 9, faculty: 'Derecho' },
      { year: 2023, value: 12, faculty: 'Educación' },
    ]
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

  get chartData() {
    const stats = this.mockStats[this.selectedCity];
    return {
      labels: stats.productsOverYears.map(p => p.year.toString()),
      datasets: [
        {
          label: 'Productos por Facultad',
          data: stats.productsOverYears.map(p => p.value),
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
    this.selectedCity = city;
  }
}
