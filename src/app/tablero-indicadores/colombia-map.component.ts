import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface City {
  name: string;
  x: number;
  y: number;
  programs: number;
  color: string;
  icon: string; // icon SVG path or class
  imageUrl: string; // for tooltip image
}

@Component({
  selector: 'app-colombia-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="header-title">Investigación</h1>
      <p class="header-subtitle">Fundación Universitaria San Martín</p>
      <div class="city-buttons">
        <button *ngFor="let city of cities"
          (click)="selectCity(city.name)"
          [class.active]="city.name === selected">
          {{ city.name }}
        </button>
      </div>
      <div class="content-grid">
        <div class="left-panel">
          <div class="info-box pink">
            <h3>Distinciones y reconocimientos</h3>
            <p class="number">{{ info.distinciones }}</p>
            <p class="label">Estudiantes<br>{{ selected }}</p>
          </div>
          <div class="info-box yellow">
            <h3>Semilleros de Investigación</h3>
            <p class="number">{{ info.semilleros }}</p>
            <p class="label">Sede<br>{{ selected }}</p>
          </div>
          <div class="info-box green">
            <h3>Grupos de Investigación</h3>
            <p class="number">{{ info.grupos }}</p>
            <p class="label">Investigación<br>{{ selected }}</p>
          </div>
          <div class="info-box purple">
            <h3>Proyectos de Investigación</h3>
            <p class="number">{{ info.proyectos }}</p>
            <p class="label">Estudiantes<br>{{ selected }}</p>
          </div>
          <div class="info-box blue">
            <h3>Productos de Investigación</h3>
            <p class="number">{{ info.productos }}</p>
            <p class="label">Investigación<br>{{ selected }}</p>
          </div>
          <div class="chart-bar">
            <h4>Productos de Investigación</h4>
            <div class="bar-container">
              <div *ngFor="let year of chartData" class="bar" [style.height.%]="year.value" [title]="year.year">{{ year.year }}</div>
            </div>
          </div>
          <div class="table-container">
            <h4>Tendencia por Programas</h4>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Facultad</th>
                  <th>Productos de Investigación</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let program of programTrends; let i = index">
                  <td>{{ i + 1 | number:'2.0' }}</td>
                  <td>{{ program.facultad }}</td>
                  <td>{{ program.productos }}</td>
                  <td>
                    <div class="progress-bar" [style.width.%]="program.porcentaje"></div>
                    <span>{{ program.porcentaje }}%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="map-container">
          <div class="svg-wrapper" [innerHTML]="svgContent"></div>
          <svg class="overlay-svg">
            <g *ngFor="let city of cities"
               (click)="selectCity(city.name)"
               (mouseenter)="showTooltip(city, $event)"
               (mousemove)="moveTooltip($event)"
               (mouseleave)="hideTooltip()"
               class="city-marker"
               [attr.data-city]="city.name"
               [attr.fill]="city.color">
              <circle [attr.cx]="city.x" [attr.cy]="city.y" r="12" [attr.fill]="city.color" stroke="#fff" stroke-width="2"/>
              <text [attr.x]="city.x" [attr.y]="city.y + 5" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">
                {{ city.name[0] }}
              </text>
            </g>
            <g *ngIf="tooltipCity !== null" class="tooltip-group" [attr.transform]="'translate(' + tooltipX + ',' + tooltipY + ')'">
              <rect width="200" height="80" fill="#222" rx="10" ry="10" opacity="0.9"/>
              <image [attr.x]="10" [attr.y]="10" width="60" height="60" [attr.href]="tooltipCity.imageUrl" />
              <text x="80" y="30" fill="#fff" font-weight="bold" font-size="16">{{ tooltipCity.name }}</text>
              <text x="80" y="55" fill="#ccc" font-size="14">Programas: {{ tooltipCity.programs }}</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header-title {
      font-weight: 700;
      font-size: 28px;
      margin-bottom: 0;
    }
    .header-subtitle {
      font-weight: 400;
      font-size: 14px;
      color: #666;
      margin-top: 4px;
      margin-bottom: 20px;
    }
    .city-buttons {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      background-color: transparent;
    }
    .city-buttons button {
      padding: 6px 14px;
      border: none;
      border-radius: 12px;
      background-color: #4b5563;
      color: #d1d5db;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      font-weight: 600;
      font-size: 13px;
      min-width: 80px;
      text-align: center;
      box-shadow: none;
    }
    .city-buttons button.active {
      background-color: #2563eb;
      color: white;
      box-shadow: none;
    }
    .city-buttons button:hover:not(.active) {
      background-color: #374151;
      color: white;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 20px;
    }
    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .info-box {
      border-radius: 12px;
      padding: 15px 20px;
      color: #1f2937;
      font-weight: 700;
      box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
    }
    .info-box h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
    }
    .info-box .number {
      font-size: 32px;
      margin: 0 0 4px 0;
    }
    .info-box .label {
      font-weight: 400;
      font-size: 12px;
      color: #4b5563;
      white-space: pre-line;
    }
    .info-box.pink {
      background-color: #fce7f3;
      color: #9d174d;
    }
    .info-box.yellow {
      background-color: #fef3c7;
      color: #92400e;
    }
    .info-box.green {
      background-color: #dcfce7;
      color: #166534;
    }
    .info-box.purple {
      background-color: #ede9fe;
      color: #5b21b6;
    }
    .info-box.blue {
      background-color: #dbeafe;
      color: #1e40af;
    }
    .chart-bar {
      background-color: #f3f4f6;
      border-radius: 12px;
      padding: 15px 20px;
      box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
    }
    .chart-bar h4 {
      margin: 0 0 12px 0;
      font-weight: 700;
      font-size: 16px;
    }
    .bar-container {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 100px;
    }
    .bar {
      width: 20px;
      background-color: #3b82f6;
      border-radius: 6px 6px 0 0;
      transition: background-color 0.3s ease;
      cursor: pointer;
    }
    .bar:hover {
      background-color: #2563eb;
    }
    .table-container {
      background-color: white;
      border-radius: 12px;
      padding: 15px 20px;
      box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
      margin-top: 15px;
    }
    .table-container h4 {
      margin: 0 0 12px 0;
      font-weight: 700;
      font-size: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      color: #374151;
    }
    th, td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      font-weight: 700;
      background-color: #f9fafb;
    }
    .progress-bar {
      height: 8px;
      background-color: #3b82f6;
      border-radius: 4px;
      transition: width 0.3s ease;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
  `]
})
export class ColombiaMapComponent implements OnInit {
  @Input() selected: string = 'Bogotá';
  @Output() selectedChange = new EventEmitter<string>();

  svgContent: SafeHtml = '';

  info = {
    distinciones: 25,
    semilleros: 60,
    grupos: 12,
    proyectos: 34,
    productos: 12
  };

  chartData = [
    { year: 2020, value: 60 },
    { year: 2021, value: 70 },
    { year: 2022, value: 50 },
    { year: 2023, value: 100 },
    { year: 2024, value: 80 },
    { year: 2025, value: 90 },
    { year: 2026, value: 85 }
  ];

  programTrends = [
    { facultad: 'Ciencias de la', productos: 55, porcentaje: 45 },
    { facultad: 'Medicina', productos: 30, porcentaje: 29 },
    { facultad: 'Ciencias', productos: 18, porcentaje: 18 }
  ];

  cities: City[] = [
    { name: 'Bogotá', x: 300, y: 100, programs: 65, color: '#2563eb', icon: '', imageUrl: 'assets/perfil1.jpg' },
    { name: 'Cali', x: 150, y: 250, programs: 40, color: '#6b7280', icon: '', imageUrl: 'assets/perfil2.jpeg' },
    { name: 'Pasto', x: 100, y: 350, programs: 25, color: '#6b7280', icon: '', imageUrl: 'assets/perfil3.jpg' },
    { name: 'Puerto Colombia', x: 400, y: 300, programs: 15, color: '#6b7280', icon: '', imageUrl: 'assets/perfil1.jpg' },
    { name: 'Sabaneta', x: 200, y: 300, programs: 30, color: '#6b7280', icon: '', imageUrl: 'assets/perfil2.jpeg' }
  ];

  tooltipCity: City | null = null;
  tooltipX: number = 0;
  tooltipY: number = 0;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    fetch('assets/Colombia.svg')
      .then(response => response.text())
      .then(svg => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }

  selectCity(name: string) {
    this.selected = name;
    this.selectedChange.emit(name);
  }

  showTooltip(city: City, event: MouseEvent) {
    this.tooltipCity = city;
    this.tooltipX = event.offsetX + 10;
    this.tooltipY = event.offsetY + 10;
  }

  moveTooltip(event: MouseEvent) {
    this.tooltipX = event.offsetX + 10;
    this.tooltipY = event.offsetY + 10;
  }

  hideTooltip() {
    this.tooltipCity = null;
  }

  getPrograms(cityName: string): number {
    const city = this.cities.find(c => c.name === cityName);
    return city ? city.programs : 0;
  }
}
