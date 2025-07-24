import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';

interface ResearchGroup {
  id: number;
  nombre: string;
  categoria: string;
  estado: string;
}

@Component({
  selector: 'app-grupos-investigacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos-investigacion.component.html',
  styleUrls: ['./grupos-investigacion.component.css']
})
export class GruposInvestigacionComponent {
  groups: ResearchGroup[] = [
    { id: 1, nombre: 'Políticas Públicas', categoria: 'A1', estado: 'Activo' },
    { id: 2, nombre: 'Ciencias Sociales', categoria: 'A2', estado: 'Inactivo' },
    // Add more groups as needed
  ];

  // New property for Vínculos externos tab form data
  vinculosExternosData = {
    aplica: false,
    entidadExterna: '',
    codigoProyecto: null as number | null,
    titulo: '',
    tipoEntidadExterna: ''
  };

  // Add options for tipoEntidadExterna dropdown
  tiposEntidadExterna: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3'];

  selectedGroupId: number | null = null;
  showCreateForm: boolean = false;
  activeTab: string = 'datosBasicos';
  activeSubTab: string = 'productos';

  // Track toggled buttons by their unique identifiers (e.g., button labels or indexes)
  toggledButtons: Set<string> = new Set();

  // Selected project and product for detail view
  selectedProject: Project | null = null;
  selectedProduct: any = null;

  // New properties for create project modal and new project data
  showCreateProjectForm: boolean = false;
  newProject: Project = {
    titulo: '',
    startDate: new Date(),
    endDate: new Date()
  };

  // New properties for semillero form and data
  showCreateSemilleroForm: boolean = false;
  newSemillero: any = {
    codigo: null,
    nombre: '',
    fechaCreacion: '',
    sede: '',
    facultad: '',
    estado: 'Activo',
    mision: '',
    vision: '',
    objetivoGeneral: '',
    objetivosEspecificos: '',
    justificacion: '',
    resultadosCortoPlazo: '',
    resultadosMedianoPlazo: '',
    resultadosLargoPlazo: '',
    estrategiasTrabajo: '',
    docentes: [],
    estudiantes: [],
    rubricStatus: '',
    rubricObservations: ''
  };

  setActiveSubTab(tabName: string) {
    this.activeSubTab = tabName;
    // Clear selected project/product when switching tabs
    if (tabName !== 'proyectos') {
      this.selectedProject = null;
    }
    if (tabName !== 'productos') {
      this.selectedProduct = null;
    }
    if (tabName !== 'semilleros') {
      this.showCreateSemilleroForm = false;
    }
  }

  // Toggle button color state by id or label
  toggleButtonColor(buttonId: string) {
    if (this.toggledButtons.has(buttonId)) {
      this.toggledButtons.delete(buttonId);
    } else {
      this.toggledButtons.add(buttonId);
    }
  }

  // Check if button is toggled
  isButtonToggled(buttonId: string): boolean {
    return this.toggledButtons.has(buttonId);
  }

  // Data for Líneas tab
  tiposLinea: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  lineasInvestigacion: Array<{ tipo: string; nombre: string; descripcion: string; estado: string }> = [];

  // Data for Integrantes tab
  documentosIdentidad: string[] = ['Documento 1', 'Documento 2', 'Documento 3'];
  roles: string[] = ['Rol 1', 'Rol 2', 'Rol 3'];
  estados: string[] = ['Activo', 'Inactivo'];
  integrantes: Array<{ documento: string; nombre: string; fechaVinculacion: string; rol: string; estado: string }> = [];

  toggleCreateForm() {
    console.log('toggleCreateForm called, current showCreateForm:', this.showCreateForm);
    this.showCreateForm = !this.showCreateForm;
  }

  onGroupCheckboxChange(groupId: number, checked: boolean) {
    if (checked) {
      this.selectedGroupId = groupId;
    } else if (this.selectedGroupId === groupId) {
      this.selectedGroupId = null;
    }
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  addLineaInvestigacion() {
    this.lineasInvestigacion.push({ tipo: '', nombre: '', descripcion: '', estado: 'Activo' });
  }

  addIntegrante() {
    this.integrantes.push({ documento: '', nombre: '', fechaVinculacion: '', rol: '', estado: 'Activo' });
  }

  // Data for Productos, Proyectos y Semilleros tab
  productos: Array<{ codigo: string; titulo: string; fechaCreacion: string; estado: string; origen: string }> = [];
  proyectos: Project[] = [];
  semilleros: Array<{ codigo: string; titulo: string; fechaCreacion: string; estado: string; origen: string }> = [];

  // Filters for each sub-tab
  filtroProducto: string = '';
  filtroProyecto: string = '';
  filtroSemillero: string = '';

  addProducto() {
    this.productos.push({ codigo: '', titulo: '', fechaCreacion: '', estado: 'Activo', origen: '' });
  }

  addProyecto() {
    this.showCreateProjectForm = true;
  }

  addSemillero() {
    this.activeSubTab = 'semilleros';
    this.newSemillero = {
      codigo: null,
      nombre: '',
      fechaCreacion: '',
      sede: '',
      facultad: '',
      estado: 'Activo',
      mision: '',
      vision: '',
      objetivoGeneral: '',
      objetivosEspecificos: '',
      justificacion: '',
      resultadosCortoPlazo: '',
      resultadosMedianoPlazo: '',
      resultadosLargoPlazo: '',
      estrategiasTrabajo: '',
      docentes: [],
      estudiantes: [],
      rubricStatus: '',
      rubricObservations: ''
    };
    this.showCreateSemilleroForm = true;
  }

  onSelectSemillero(semillero: any) {
    this.showCreateSemilleroForm = true;
    this.newSemillero = { ...semillero };
  }

  // Select a project to show details
  selectProject(proyecto: Project) {
    this.selectedProject = { ...proyecto };
    this.selectedProduct = null;
  }

  // Select a product to show details
  selectProduct(producto: any) {
    this.selectedProduct = { ...producto };
    this.selectedProject = null;
  }

  // Calculate Duración prevista based on initial schedule
  calcularDuracionPrevista(proyecto: Project): string {
    if (!proyecto.cronogramaInicial || !proyecto.cronogramaInicial.fechaInicio || !proyecto.cronogramaInicial.fechaFin) {
      return 'N/A';
    }
    // Example: calculate months between start and end dates in cronogramaInicial
    const start = new Date(proyecto.cronogramaInicial.fechaInicio);
    const end = new Date(proyecto.cronogramaInicial.fechaFin);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months > 0 ? `${months} meses` : '0 meses';
  }

  // Update Estado automatically based on expiration or pending products
  actualizarEstado(proyecto: Project): string {
    const today = new Date();
    if (!proyecto.fechaTerminacion) {
      return proyecto.estado || '';
    }
    const fechaTerminacion = new Date(proyecto.fechaTerminacion);
    if (fechaTerminacion < today && proyecto.productosPendientes) {
      return 'Finalizado con productos pendientes';
    }
    if (fechaTerminacion < today) {
      return 'Expirado';
    }
    return proyecto.estado || '';
  }

  // Save new project from create project form
  saveNewProject() {
    // Assign a new id and codigo for simplicity
    const newId = this.proyectos.length > 0 ? Math.max(...this.proyectos.map(p => p.id || 0)) + 1 : 1;
    this.newProject.id = newId;
    this.newProject.codigo = `P-${newId.toString().padStart(4, '0')}`;
    this.newProject.fechaCreacion = new Date().toISOString().split('T')[0];
    this.proyectos.push({ ...this.newProject });
    this.showCreateProjectForm = false;
    this.newProject = { titulo: '', startDate: new Date(), endDate: new Date() };
  }

  // Save changes to selected project
  saveSelectedProject() {
    if (!this.selectedProject) return;
    const index = this.proyectos.findIndex(p => p.id === this.selectedProject?.id);
    if (index !== -1) {
      this.proyectos[index] = { ...this.selectedProject };
    }
  }

  // Cancel create project form
  cancelCreateProject() {
    this.showCreateProjectForm = false;
    this.newProject = { titulo: '', startDate: new Date(), endDate: new Date() };
  }

  // Save new semillero from create semillero form
  saveNewSemillero() {
    // Assign a new id and codigo for simplicity
    const newId = this.semilleros.length > 0 ? Math.max(...this.semilleros.map(s => Number(s.codigo) || 0)) + 1 : 1;
    this.newSemillero.codigo = newId;
    this.newSemillero.fechaCreacion = new Date().toISOString().split('T')[0];
    this.semilleros.push({ ...this.newSemillero });
    this.showCreateSemilleroForm = false;
    this.newSemillero = {
      codigo: null,
      nombre: '',
      fechaCreacion: '',
      sede: '',
      facultad: '',
      estado: 'Activo',
      mision: '',
      vision: '',
      objetivoGeneral: '',
      objetivosEspecificos: '',
      justificacion: '',
      resultadosCortoPlazo: '',
      resultadosMedianoPlazo: '',
      resultadosLargoPlazo: '',
      estrategiasTrabajo: '',
      docentes: [],
      estudiantes: [],
      rubricStatus: '',
      rubricObservations: ''
    };
  }

  // Cancel create semillero form
  cancelCreateSemillero() {
    this.showCreateSemilleroForm = false;
    this.newSemillero = {
      codigo: null,
      nombre: '',
      fechaCreacion: '',
      sede: '',
      facultad: '',
      estado: 'Activo',
      mision: '',
      vision: '',
      objetivoGeneral: '',
      objetivosEspecificos: '',
      justificacion: '',
      resultadosCortoPlazo: '',
      resultadosMedianoPlazo: '',
      resultadosLargoPlazo: '',
      estrategiasTrabajo: '',
      docentes: [],
      estudiantes: [],
      rubricStatus: '',
      rubricObservations: ''
    };
  }

  // Add docente to newSemillero
  addDocente() {
    this.newSemillero.docentes.push({
      nroIdentificacion: '',
      nombreCompleto: '',
      programaFacultad: '',
      telefonoContacto: '',
      correoElectronico: '',
      tituloProfesional: ''
    });
  }

  // Remove docente by index
  removeDocente(index: number) {
    this.newSemillero.docentes.splice(index, 1);
  }

  // Add estudiante to newSemillero
  addEstudiante() {
    this.newSemillero.estudiantes.push({
      nroIdentificacion: '',
      nombreCompleto: '',
      facultadPrograma: '',
      correoElectronico: '',
      telefono: '',
      semestre: null,
      fechaIngreso: ''
    });
  }

  // Remove estudiante by index
  removeEstudiante(index: number) {
    this.newSemillero.estudiantes.splice(index, 1);
  }
}
