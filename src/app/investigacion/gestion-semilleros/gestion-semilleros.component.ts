import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Docente {
  nombreCompleto: string;
  numeroIdentificacion: number | null;
  tituloProfesional: string;
  programa: string;
  telefonoContacto: number | null;
  correoElectronico: string;
}

interface Estudiante {
  numeroIdentificacion: number | null;
  nombres: string;
  apellidos: string;
  programaAcademico: string;
  semestre: number | null;
  fechaIngreso: string;
  telefonoContacto: number | null;
  correoElectronico: string;
}

interface Semillero {
  nombre: string;
  fechaCreacion: string;
  sede: string;
  facultad: string;
  grupoInvestigacion?: string;
  misionVision: string;
  objetivoGeneral: string;
  objetivosEspecificos: string;
  justificacion: string;
  resultadosEsperados: string;
  estrategiasTrabajo: string;
  docentes: Docente[];
  estudiantes: Estudiante[];
  estado: string;
}

@Component({
  selector: 'app-gestion-semilleros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-semilleros.component.html',
  styleUrls: ['./gestion-semilleros.component.css']
})
export class GestionSemillerosComponent {
  sedes: string[] = ['Bogotá', 'Cali', 'Pasto', 'Puerto Colombia', 'Sabaneta'];
  facultadesPorSede: { [key: string]: string[] } = {
    'Bogotá': ['Facultad de Ingeniería', 'Facultad de Ciencias Sociales'],
    'Cali': ['Facultad de Medicina', 'Facultad de Ciencias Sociales'],
    'Pasto': ['Facultad de Ingeniería', 'Facultad de Medicina'],
    'Puerto Colombia': ['Facultad de Ingeniería'],
    'Sabaneta': ['Facultad de Ciencias Sociales']
  };
  programas: string[] = ['Ingeniería Civil', 'Sociología', 'Medicina General'];

  semilleros: Semillero[] = [
    {
      nombre: 'Semillero Innovación Tecnológica',
      fechaCreacion: '2023-01-15',
      sede: 'Bogotá',
      facultad: 'Facultad de Ingeniería',
      grupoInvestigacion: 'Grupo de Robótica',
      misionVision: 'Impulsar la innovación tecnológica en la universidad.',
      objetivoGeneral: 'Desarrollar proyectos tecnológicos innovadores.',
      objetivosEspecificos: 'Fomentar la investigación aplicada y la formación de estudiantes.',
      justificacion: 'Necesidad de fortalecer la investigación tecnológica.',
      resultadosEsperados: 'Proyectos aplicados y publicaciones científicas.',
      estrategiasTrabajo: 'Trabajo colaborativo y uso de tecnologías emergentes.',
      docentes: [],
      estudiantes: [],
      estado: 'Activo'
    },
    {
      nombre: 'Semillero Ciencias Sociales',
      fechaCreacion: '2022-09-10',
      sede: 'Cali',
      facultad: 'Facultad de Ciencias Sociales',
      grupoInvestigacion: 'Grupo de Sociología Urbana',
      misionVision: 'Analizar fenómenos sociales urbanos.',
      objetivoGeneral: 'Generar conocimiento sobre dinámicas sociales.',
      objetivosEspecificos: 'Realizar estudios de campo y análisis crítico.',
      justificacion: 'Importancia de entender la realidad social local.',
      resultadosEsperados: 'Informes y propuestas de intervención social.',
      estrategiasTrabajo: 'Investigación participativa y multidisciplinaria.',
      docentes: [],
      estudiantes: [],
      estado: 'Activo'
    }
  ];

  showCreateForm: boolean = false;

  newSemillero: Semillero = this.getEmptySemillero();

  selectedSemillero: Semillero | null = null;
  activeTab: 'informacion' | 'docentes' | 'estudiantes' = 'informacion';

  selectSemillero(semillero: Semillero) {
    this.selectedSemillero = semillero;
    this.activeTab = 'informacion';
  }

  setActiveTab(tab: 'informacion' | 'docentes' | 'estudiantes') {
    this.activeTab = tab;
  }

  selectedSede: string = '';
  availableFacultades: string[] = [];

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newSemillero = this.getEmptySemillero();
    this.selectedSede = '';
    this.availableFacultades = [];
  }

  getEmptySemillero(): Semillero {
    return {
      nombre: '',
      fechaCreacion: new Date().toISOString().substring(0, 10),
      sede: '',
      facultad: '',
      grupoInvestigacion: '',
      misionVision: '',
      objetivoGeneral: '',
      objetivosEspecificos: '',
      justificacion: '',
      resultadosEsperados: '',
      estrategiasTrabajo: '',
      docentes: [],
      estudiantes: [],
      estado: 'Activo'
    };
  }

  onSedeChange() {
    this.availableFacultades = this.facultadesPorSede[this.selectedSede] || [];
    this.newSemillero.facultad = '';
  }

  addDocente() {
    this.newSemillero.docentes.push({
      nombreCompleto: '',
      numeroIdentificacion: null,
      tituloProfesional: '',
      programa: '',
      telefonoContacto: null,
      correoElectronico: ''
    });
  }

  removeDocente(index: number) {
    this.newSemillero.docentes.splice(index, 1);
  }

  addEstudiante() {
    this.newSemillero.estudiantes.push({
      numeroIdentificacion: null,
      nombres: '',
      apellidos: '',
      programaAcademico: '',
      semestre: null,
      fechaIngreso: '',
      telefonoContacto: null,
      correoElectronico: ''
    });
  }

  removeEstudiante(index: number) {
    this.newSemillero.estudiantes.splice(index, 1);
  }

  createSemillero() {
    if (this.newSemillero.nombre && this.newSemillero.sede && this.newSemillero.facultad) {
      this.semilleros.push({...this.newSemillero});
      this.toggleCreateForm();
    } else {
      alert('Por favor complete los campos obligatorios: Nombre, Sede y Facultad.');
    }
  }
}
