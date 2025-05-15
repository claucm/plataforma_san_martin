import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColombiaMapComponent } from './colombia-map.component';

interface Trend {
  name: string;
  value: number;
}

interface ProductOverYear {
  year: number;
  value: number;
  faculty: string;
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

const LOCATIONS = ['Bogotá', 'Cali', 'Pasto', 'Puerto Colombia', 'Sabaneta'];

const MOCK_STATS: Record<string, Stats> = {
  Bogotá: {
    distinctions: 25,
    seedbeds: 60,
    researchGroups: 12,
    researchProjects: 34,
    researchProducts: 12,
    trends: [
      { name: 'Ciencias de la', value: 45 },
      { name: 'Medicina', value: 29 },
      { name: 'Ciencias', value: 18 },
    ],
    productsOverYears: [
      { year: 2020, value: 18, faculty: 'Ciencias de la' },
      { year: 2021, value: 20, faculty: 'Medicina' },
      { year: 2022, value: 14, faculty: 'Ciencias' },
      { year: 2023, value: 28, faculty: 'Ciencias de la' },
      { year: 2024, value: 19, faculty: 'Medicina' },
      { year: 2025, value: 23, faculty: 'Ciencias' },
      { year: 2026, value: 20, faculty: 'Ciencias de la' },
    ],
  },
  Cali: {
    distinctions: 12,
    seedbeds: 40,
    researchGroups: 9,
    researchProjects: 18,
    researchProducts: 7,
    trends: [
      { name: 'Ingeniería', value: 40 },
      { name: 'Salud', value: 25 },
      { name: 'Ciencias Económicas', value: 20 },
    ],
    productsOverYears: [
      { year: 2021, value: 10, faculty: 'Ingeniería' },
      { year: 2022, value: 12, faculty: 'Salud' },
      { year: 2023, value: 14, faculty: 'Ingeniería' },
      { year: 2024, value: 7, faculty: 'Ciencias Económicas' },
    ],
  },
  Pasto: {
    distinctions: 8,
    seedbeds: 30,
    researchGroups: 5,
    researchProjects: 10,
    researchProducts: 4,
    trends: [
      { name: 'Educación', value: 55 },
      { name: 'Salud', value: 20 },
      { name: 'Ciencias Sociales', value: 15 },
    ],
    productsOverYears: [
      { year: 2023, value: 5, faculty: 'Educación' },
      { year: 2024, value: 8, faculty: 'Salud' },
    ],
  },
  Puerto_Colombia: {
    distinctions: 6,
    seedbeds: 25,
    researchGroups: 4,
    researchProjects: 9,
    researchProducts: 3,
    trends: [
      { name: 'Turismo', value: 60 },
      { name: 'Ambiental', value: 25 },
    ],
    productsOverYears: [
      { year: 2023, value: 4, faculty: 'Turismo' },
    ],
  },
  Sabaneta: {
    distinctions: 10,
    seedbeds: 35,
    researchGroups: 7,
    researchProjects: 15,
    researchProducts: 6,
    trends: [
      { name: 'Derecho', value: 30 },
      { name: 'Ciencias Económicas', value: 45 },
    ],
    productsOverYears: [
      { year: 2022, value: 6, faculty: 'Derecho' },
      { year: 2023, value: 9, faculty: 'Ciencias Económicas' },
    ],
  },
};

@Component({
  selector: 'app-investigacion-dashboard',
  templateUrl: './investigacion-dashboard.component.html',
  styleUrls: ['./investigacion-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ColombiaMapComponent]
})
export class InvestigacionDashboardComponent {
  locations = LOCATIONS;
  mockStats = MOCK_STATS;

  selectedCity = 'Bogotá';
  selectedYear = 'Todos';
  selectedFaculty = 'Todos';

  get allData() {
    return Object.entries(this.mockStats).flatMap(([city, stats]) =>
      stats.productsOverYears.map(d => ({ ...d, city }))
    );
  }

  get faculties() {
    return ['Todos', ...new Set(this.allData.map(p => p.faculty))];
  }

  get years() {
    return ['Todos', ...new Set(this.allData.map(p => p.year.toString()))];
  }

  get filteredData() {
    return this.allData.filter(p =>
      (this.selectedYear === 'Todos' || p.year.toString() === this.selectedYear) &&
      (this.selectedFaculty === 'Todos' || p.faculty === this.selectedFaculty)
    );
  }

  get stats() {
    return this.mockStats[this.selectedCity];
  }

  setSelectedCity(city: string) {
    this.selectedCity = city;
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
  }

  setSelectedFaculty(faculty: string) {
    this.selectedFaculty = faculty;
  }
}
