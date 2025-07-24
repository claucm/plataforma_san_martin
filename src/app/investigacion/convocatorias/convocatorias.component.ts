import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Convocatoria {
  codigo: string;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  proyectos: number;
  sede?: string;
  facultad?: string;
  programa?: string;
  descripcion?: string;
  documento?: string;
  criteriosEvaluacion?: { factor: string; puntajeMaximo: number }[];
}

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-convocatorias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {
  convocatorias: Convocatoria[] = [];

  filterCodigo: string = '';
  filterTitulo: string = '';
  filterFechaInicio: string = '';
  filterFechaFin: string = '';
  filterEstado: string = '';
  filterProyectos: string = '';
  filterSede: string = '';
  filterFacultad: string = '';
  filterPrograma: string = '';

  sedes: string[] = [];
  facultades: string[] = [];
  programas: string[] = [];

  selectedConvocatoria: Convocatoria | null = null;
  showModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // For now, mock data; replace with real data fetching
    this.convocatorias = [
      {
        codigo: '1',
        titulo: 'Convocatoria de Prueba',
        fechaInicio: '2023-01-01',
        fechaFin: '2023-03-31',
        estado: 'Abierta',
        proyectos: 5,
        sede: 'Sede A',
        facultad: 'Facultad de Ciencias',
        programa: 'Programa 1',
        descripcion: 'Descripción completa de la convocatoria de prueba.',
        documento: 'documento-prueba.pdf',
        criteriosEvaluacion: [
          { factor: 'Título', puntajeMaximo: 5 },
          { factor: 'Problema de investigación', puntajeMaximo: 10 },
          { factor: 'Estado del arte', puntajeMaximo: 10 },
          { factor: 'Objetivos', puntajeMaximo: 25 },
          { factor: 'Materiales y métodos', puntajeMaximo: 20 },
          { factor: 'Interdisciplinariedad', puntajeMaximo: 5 },
          { factor: 'Resultados esperados', puntajeMaximo: 6 },
          { factor: 'Más de una disciplina', puntajeMaximo: 2 },
          { factor: 'Formación investigativa', puntajeMaximo: 2 },
          { factor: 'Concordancia presupuesto', puntajeMaximo: 5 },
          { factor: 'Usos sector público', puntajeMaximo: 5 },
          { factor: 'Cronograma', puntajeMaximo: 5 }
        ]
      },
      {
        codigo: '2',
        titulo: 'Convocatoria Ficticia 2',
        fechaInicio: '2023-04-01',
        fechaFin: '2023-06-30',
        estado: 'Cerrada',
        proyectos: 3,
        sede: 'Sede B',
        facultad: 'Facultad de Ingeniería',
        programa: 'Programa 2',
        descripcion: 'Descripción de la convocatoria ficticia 2.',
        documento: 'documento-ficticio2.pdf',
        criteriosEvaluacion: [
          { factor: 'Título', puntajeMaximo: 4 },
          { factor: 'Problema de investigación', puntajeMaximo: 9 },
          { factor: 'Estado del arte', puntajeMaximo: 8 },
          { factor: 'Objetivos', puntajeMaximo: 20 },
          { factor: 'Materiales y métodos', puntajeMaximo: 18 },
          { factor: 'Interdisciplinariedad', puntajeMaximo: 4 },
          { factor: 'Resultados esperados', puntajeMaximo: 5 },
          { factor: 'Más de una disciplina', puntajeMaximo: 3 },
          { factor: 'Formación investigativa', puntajeMaximo: 3 },
          { factor: 'Concordancia presupuesto', puntajeMaximo: 4 },
          { factor: 'Usos sector público', puntajeMaximo: 4 },
          { factor: 'Cronograma', puntajeMaximo: 4 }
        ]
      },
      {
        codigo: '3',
        titulo: 'Convocatoria Ficticia 3',
        fechaInicio: '2023-07-01',
        fechaFin: '2023-09-30',
        estado: 'Activo',
        proyectos: 7,
        sede: 'Sede A',
        facultad: 'Facultad de Ciencias',
        programa: 'Programa 3',
        descripcion: 'Descripción de la convocatoria ficticia 3.',
        documento: 'documento-ficticio3.pdf',
        criteriosEvaluacion: [
          { factor: 'Título', puntajeMaximo: 6 },
          { factor: 'Problema de investigación', puntajeMaximo: 11 },
          { factor: 'Estado del arte', puntajeMaximo: 12 },
          { factor: 'Objetivos', puntajeMaximo: 26 },
          { factor: 'Materiales y métodos', puntajeMaximo: 22 },
          { factor: 'Interdisciplinariedad', puntajeMaximo: 6 },
          { factor: 'Resultados esperados', puntajeMaximo: 7 },
          { factor: 'Más de una disciplina', puntajeMaximo: 3 },
          { factor: 'Formación investigativa', puntajeMaximo: 3 },
          { factor: 'Concordancia presupuesto', puntajeMaximo: 6 },
          { factor: 'Usos sector público', puntajeMaximo: 6 },
          { factor: 'Cronograma', puntajeMaximo: 6 }
        ]
      }
    ];

    this.sedes = Array.from(new Set(this.convocatorias.map(c => c.sede || ''))).filter(s => s !== '');
    this.facultades = Array.from(new Set(this.convocatorias.map(c => c.facultad || ''))).filter(f => f !== '');
    this.programas = Array.from(new Set(this.convocatorias.map(c => c.programa || ''))).filter(p => p !== '');
  }

  get filteredConvocatorias(): Convocatoria[] {
    return this.convocatorias.filter(c => {
      return (
        c.codigo.toLowerCase().includes(this.filterCodigo.toLowerCase()) &&
        c.titulo.toLowerCase().includes(this.filterTitulo.toLowerCase()) &&
        c.fechaInicio.toLowerCase().includes(this.filterFechaInicio.toLowerCase()) &&
        c.fechaFin.toLowerCase().includes(this.filterFechaFin.toLowerCase()) &&
        c.estado.toLowerCase().includes(this.filterEstado.toLowerCase()) &&
        c.proyectos.toString().includes(this.filterProyectos) &&
        c.sede?.toLowerCase().includes(this.filterSede.toLowerCase()) &&
        c.facultad?.toLowerCase().includes(this.filterFacultad.toLowerCase()) &&
        c.programa?.toLowerCase().includes(this.filterPrograma.toLowerCase())
      );
    });
  }

  viewDetails(codigo: string) {
    this.selectedConvocatoria = this.convocatorias.find(c => c.codigo === codigo) || null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedConvocatoria = null;
  }
}
