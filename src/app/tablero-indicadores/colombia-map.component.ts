import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface City {
  name: string;
  x: number;
  y: number;
  programs: number;
}

@Component({
  selector: 'app-colombia-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg width="100%" height="300" viewBox="0 0 600 400" style="background: #f9fafb; border-radius: 10px;">
      <rect width="600" height="400" fill="#e0f2fe" />
      <g *ngFor="let city of cities" (click)="selectCity(city.name)" style="cursor: pointer;">
        <circle [attr.cx]="city.x" [attr.cy]="city.y" r="20"
          [attr.fill]="city.name === selected ? '#3b82f6' : '#93c5fd'"
          stroke="#1e40af" stroke-width="2" />
        <text [attr.x]="city.x" [attr.y]="city.y + 5" text-anchor="middle" fill="white" font-weight="bold" font-size="12">
          {{ city.name }}
        </text>
      </g>
      <g *ngIf="tooltipCity !== null">
        <rect [attr.x]="tooltipX" [attr.y]="tooltipY" width="150" height="60" fill="white" stroke="#3b82f6" rx="8" ry="8" />
        <text [attr.x]="tooltipX + 10" [attr.y]="tooltipY + 20" fill="#1e40af" font-weight="bold" font-size="14">
          {{ tooltipCity }}
        </text>
        <text [attr.x]="tooltipX + 10" [attr.y]="tooltipY + 40" fill="#1e40af" font-size="12">
          Programas: {{ getPrograms(tooltipCity) }}
        </text>
      </g>
    </svg>
  `,
  styles: [`
    svg { user-select: none; }
  `]
})
export class ColombiaMapComponent {
  @Input() selected: string = 'Bogotá';
  @Output() selectedChange = new EventEmitter<string>();

  cities: City[] = [
    { name: 'Bogotá', x: 300, y: 100, programs: 12 },
    { name: 'Cali', x: 150, y: 250, programs: 7 },
    { name: 'Pasto', x: 100, y: 350, programs: 4 },
    { name: 'Puerto Colombia', x: 400, y: 300, programs: 3 },
    { name: 'Sabaneta', x: 200, y: 300, programs: 6 },
  ];

  tooltipCity: string | null = null;
  tooltipX: number = 0;
  tooltipY: number = 0;

  selectCity(name: string) {
    this.selected = name;
    this.selectedChange.emit(name);
  }

  getPrograms(cityName: string): number {
    const city = this.cities.find(c => c.name === cityName);
    return city ? city.programs : 0;
  }
}
