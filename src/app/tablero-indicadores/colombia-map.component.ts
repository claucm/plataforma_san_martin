import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Sede {
  id: number;
  nombre: string;
  propuestas: number;
  productos: number;
  proyectos: number;
  coordenadas: [number, number];
  facultades: any[];
}

@Component({
  selector: 'app-colombia-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg width="100%" height="600" viewBox="0 0 600 600" style="background: #f9fafb; border-radius: 10px;">
      <!-- Imagen del mapa de Colombia -->
      <image href="assets/Colombia2.svg" x="0" y="0" width="600" height="600" />

      <!-- Marcadores -->
      <circle *ngFor="let sede of sedes"
        [attr.cx]="mapX(sede.coordenadas[1])"
        [attr.cy]="mapY(sede.coordenadas[0])"
        r="6"
        [attr.fill]="sede.nombre === selected ? '#2563eb' : '#3b82f6'"
        stroke="#1e40af"
        stroke-width="1.5"
        style="cursor: pointer; transition: all 0.3s;"
        (mouseenter)="hoveredSede = sede.nombre"
        (mouseleave)="hoveredSede = ''"
        (click)="onSelect(sede.nombre)">
        <title>{{ sede.nombre }}</title>
      </circle>

      <!-- Etiquetas -->
      <text *ngFor="let sede of sedes"
        [attr.x]="mapX(sede.coordenadas[1])"
        [attr.y]="mapY(sede.coordenadas[0]) - 10"
        font-size="10"
        fill="#1e40af"
        text-anchor="middle"
        [style.font-weight]="sede.nombre === selected ? 'bold' : 'normal'"
        [style.display]="sede.nombre === selected || sede.nombre === hoveredSede ? 'block' : 'none'">
        {{ sede.nombre }}
      </text>
    </svg>
  `
})
export class ColombiaMapComponent {
  @Input() sedes: Sede[] = [];
  @Input() selected: string = '';
  @Output() selectedChange = new EventEmitter<string>();
  hoveredSede: string = '';

  // viewBox = 0 0 469 496
  mapX(lon: number): number {
    // Further adjusted longitude range and added offset to center markers better
    const minLon = -79.5;
    const maxLon = -65.5;
    const svgWidth = 600;
    const offsetX = 108; // shift left by 3 points from 111
    return ((lon - minLon) / (maxLon - minLon)) * svgWidth + offsetX;
  }

  mapY(lat: number): number {
    // Further adjusted latitude range and added offset to center markers better
    const minLat = -5.0;
    const maxLat = 12.5;
    const svgHeight = 600;
    const offsetY = 2; // shift down by 2 points from 0
    return ((maxLat - lat) / (maxLat - minLat)) * svgHeight + offsetY;
  }

  onSelect(nombre: string) {
    this.selected = nombre;
    this.selectedChange.emit(nombre);
  }
}
