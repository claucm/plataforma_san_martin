import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConvocatoriasComponent } from '../convocatorias/convocatorias.component';

interface Investigador {
  nroIdentificacion: string;
  nombresApellidos: string;
  horasDedicacion: number;
  institucion?: string;
}

interface Estudiante {
  nroIdentificacion: string;
  nombresApellidos: string;
}

interface LugarEjecucion {
  pais: string;
  departamento: string;
  ciudad: string;
  institucion: string;
  duracion: number;
}

interface ResultadoEsperado {
  tipoProducto: string;
  subtipoProducto: string;
  producto: string;
  descripcion: string;
  cantidad: number;
  beneficiario: string;
}

interface EvaluadorSugerido {
  nroIdentificacion: string;
  nombresApellidos: string;
  institucion: string;
}

@Component({
  selector: 'app-registro-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-proyecto.component.html',
  styleUrls: ['./registro-proyecto.component.css']
})

export class RegistroProyectoComponent implements OnInit {
  tipoConvocatoria: string = '';
  tipoConvocatoriaOptions: string[] = ['Interna', 'Externa', 'No aplica'];

  convocatoria: string = '';
  convocatoriaText: string = '';
  documentosAdicionales: File | null = null;

  codigo: string = '';
  fechaCreacion: string = new Date().toISOString().split('T')[0];
  fechaPresentacion: string = '';
  titulo: string = '';
  duracionPrevista: number | null = null;
  areaConocimiento: string = '';
  facultad: string = '';
  programa: string = '';
  sede: string = '';
  grupoInvestigacion: string = '';
  linea: string = '';

  caracteristicas: string = '';
  objetivoGeneral: string = '';
  objetivosEspecificos: string = '';
  resumen: string = '';

  tipoProyecto: string = '';
  tipoProducto: string = '';
  producto: string = '';
  cronograma: string = '';

  totalSolicitado: number | null = null;
  presupuestoAnual: number | null = null;

  valorTotalProyecto: number = 0;
  aportesInstitucion: number | null = null;
  aportesFacultad: number | null = null;
  financiacionEntidadesExternas: number | null = null;
  contrapartida: number | null = null;

  convocatorias: string[] = [];

  areasConocimiento: string[] = ['Ciencias Sociales', 'Ingeniería', 'Salud'];
  facultades: string[] = ['Facultad 1', 'Facultad 2', 'Facultad 3'];
  programas: string[] = ['Programa 1', 'Programa 2', 'Programa 3'];
  sedes: string[] = ['Sede 1', 'Sede 2', 'Sede 3'];
  gruposInvestigacion: string[] = ['Grupo 1', 'Grupo 2', 'Grupo 3'];
  lineas: string[] = ['Línea Institucional', 'Línea Facultad', 'Ambas'];

  // New properties for countries, departments, and cities
  countries: string[] = ['Colombia', 'Argentina', 'Chile'];
  departmentsByCountry: { [key: string]: string[] } = {
    Colombia: ['Antioquia', 'Cundinamarca', 'Valle del Cauca'],
    Argentina: ['Buenos Aires', 'Córdoba', 'Santa Fe'],
    Chile: ['Santiago', 'Valparaíso', 'Concepción']
  };
  citiesByDepartment: { [key: string]: string[] } = {
    Antioquia: ['Medellín', 'Envigado', 'Bello'],
    Cundinamarca: ['Bogotá', 'Soacha', 'Chía'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura'],
    'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca'],
    Córdoba: ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto'],
    'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela'],
    Santiago: ['Santiago', 'Puente Alto', 'Maipú'],
    Valparaíso: ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    Concepción: ['Concepción', 'Talcahuano', 'Chiguayante']
  };

  // To hold dynamic departments and cities for each lugar
  dynamicDepartments: { [index: number]: string[] } = {};
  dynamicCities: { [index: number]: string[] } = {};

  // New properties for Tipo de Producto and Subtipos de Producto
  tipoProductoOptions: string[] = [
    'Generación de Nuevo Conocimiento',
    'Desarrollo Tecnológico e Innovación',
    'Apropiación Social del Conocimiento',
    'Formación de Recurso Humano para la CTeI'
  ];

  subtipoProductoOptions: { [key: string]: string[] } = {
    'Generación de Nuevo Conocimiento': [
      'Artículos de investigación A1, A2, B y C',
      'Artículos de investigación D',
      'Libros resultado de investigación',
      'Capítulos en libro resultado de investigación',
      'Productos tecnológicos patentados o en proceso de concesión de la patente',
      'Variedad vegetal y variedad animal'
    ],
    'Desarrollo Tecnológico e Innovación': [
      'Productos tecnológicos certificados o validados',
      'Productos Empresariales',
      'Regulaciones, normas, reglamentos o legislaciones',
      'Consultorías científico-tecnológicas e informes técnicos finales'
    ],
    'Apropiación Social del Conocimiento': [
      'Participación ciudadana en CTeI',
      'Estrategias pedagógicas para el fomento de la CTeI',
      'Comunicación social del conocimiento',
      'Circulación de conocimiento especializado',
      'Reconocimientos'
    ],
    'Formación de Recurso Humano para la CTeI': [
      'Tesis de Doctorado',
      'Trabajo de grado de Maestría',
      'Trabajo de grado de Pregrado',
      'Proyectos de Investigación y Desarrollo',
      'Proyectos de Investigación, Desarrollo e Innovación (ID+I)',
      'Proyecto de extensión y responsabilidad social en CTI',
      'Apoyo a programas de formación',
      'Acompañamientos y asesorías de línea temática del Programa Ondas'
    ]
  };

  onFileSelected: any = (event: any) => {
    const file: File = event.target.files[0];
    // Implement file handling logic here
    console.log('Archivo seleccionado:', file);
  };

  onCountryChange(index: number) {
    const selectedCountry = this.lugaresEjecucion[index].pais;
    this.dynamicDepartments[index] = this.departmentsByCountry[selectedCountry] || [];
    this.lugaresEjecucion[index].departamento = '';
    this.dynamicCities[index] = [];
    this.lugaresEjecucion[index].ciudad = '';
  }

  onDepartmentChange(index: number) {
    const selectedDepartment = this.lugaresEjecucion[index].departamento;
    this.dynamicCities[index] = this.citiesByDepartment[selectedDepartment] || [];
    this.lugaresEjecucion[index].ciudad = '';
  }

  onDocumentosAdicionalesSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.documentosAdicionales = file;
    } else {
      alert('Por favor seleccione un archivo PDF válido.');
      event.target.value = null;
      this.documentosAdicionales = null;
    }
  }

  showCronogramaModal: boolean = false;
  actividades: { nombre: string; fechaInicio: string; fechaFin: string; fechaPorDefecto: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generarCodigo();
    this.loadConvocatorias();
    this.addActividad(); // Initialize with one activity by default
    this.initExpectedYears();
  }

  openCronogramaModal() {
    this.showCronogramaModal = true;
  }

  closeCronogramaModal(event: any) {
    if (event) {
      this.showCronogramaModal = false;
    }
  }

  addActividad() {
    this.actividades.push({
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      fechaPorDefecto: ''
    });
  }

  removeActividad(index: number) {
    this.actividades.splice(index, 1);
  }

  updateDefaultDate(index: number) {
    const actividad = this.actividades[index];
    if (actividad.fechaInicio && actividad.fechaFin) {
      actividad.fechaPorDefecto = `${actividad.fechaInicio} - ${actividad.fechaFin}`;
    } else {
      actividad.fechaPorDefecto = '';
    }
  }

  guardarCronograma() {
    // Here you can implement the logic to save the activities data
    console.log('Cronograma guardado:', this.actividades);
    this.showCronogramaModal = false;
  }

  loadConvocatorias() {
    // Load convocatorias from ConvocatoriasComponent mock data
    const convocatoriasComponent = new ConvocatoriasComponent(this.router);
    this.convocatorias = convocatoriasComponent.convocatorias.map(c => c.titulo);
  }

  generarCodigo() {
    const year = new Date().getFullYear();
    const incremental = 1; // Static for now; in real app, fetch last incremental and add 1
    const incrementalStr = incremental.toString().padStart(2, '0');
    this.codigo = `PYI-${year}-${incrementalStr}`;
    console.log('Generated codigo:', this.codigo);
  }

  addCoInvestigador() {
    this.coInvestigadores.push({ nroIdentificacion: '', nombresApellidos: '', horasDedicacion: 0, institucion: '' });
  }

  removeCoInvestigador(index: number) {
    this.coInvestigadores.splice(index, 1);
  }

  addEstudiante() {
    this.estudiantesVinculados.push({ nroIdentificacion: '', nombresApellidos: '' });
  }

  removeEstudiante(index: number) {
    this.estudiantesVinculados.splice(index, 1);
  }

  addLugarEjecucion() {
    this.lugaresEjecucion.push({ pais: '', departamento: '', ciudad: '', institucion: '', duracion: 0 });
    const index = this.lugaresEjecucion.length - 1;
    this.dynamicDepartments[index] = [];
    this.dynamicCities[index] = [];
  }

  removeLugarEjecucion(index: number) {
    this.lugaresEjecucion.splice(index, 1);
    delete this.dynamicDepartments[index];
    delete this.dynamicCities[index];
  }

  addResultadoEsperado() {
    this.resultadosEsperados.push({ tipoProducto: '', subtipoProducto: '', producto: '', descripcion: '', cantidad: 0, beneficiario: '' });
  }

  removeResultadoEsperado(index: number) {
    this.resultadosEsperados.splice(index, 1);
  }

  addEvaluadorSugerido() {
    this.evaluadoresSugeridos.push({ nroIdentificacion: '', nombresApellidos: '', institucion: '' });
  }

  removeEvaluadorSugerido(index: number) {
    this.evaluadoresSugeridos.splice(index, 1);
  }

  calculateValorTotal() {
    this.valorTotalProyecto =
      (this.aportesInstitucion || 0) +
      (this.aportesFacultad || 0) +
      (this.financiacionEntidadesExternas || 0) +
      (this.contrapartida || 0);
  }

  saveProject() {
    this.calculateValorTotal();
    // Implement save logic here
    console.log('Guardar proyecto:', this);
  }

  investigadorPrincipal: Investigador = {
    nroIdentificacion: '',
    nombresApellidos: '',
    horasDedicacion: 0
  };

  coInvestigadores: Investigador[] = [];
  estudiantesVinculados: Estudiante[] = [];
  lugaresEjecucion: LugarEjecucion[] = [];

  resultadosEsperados: ResultadoEsperado[] = [];

  evaluadoresSugeridos: EvaluadorSugerido[] = [];

  planteamientoProblema: string = '';
  justificacion: string = '';
  preguntaInvestigacion: string = '';
  marcoTeorico: string = '';
  metodologia: string = '';
  consideracionesEticas: string = '';
  requiereComiteEtica: string = '';
  archivoComiteEtica: File | null = null;

  tipoImpacto: string = '';
  descripcionImpacto: string = '';
  anioEsperado: number | null = null;

  expectedYears: number[] = [];

  initExpectedYears() {
    const currentYear = new Date().getFullYear();
    this.expectedYears = [];
    for (let i = 0; i <= 10; i++) {
      this.expectedYears.push(currentYear + i);
    }
  }

  permisosAmbientales: File | null = null;
  propiedadIntelectual: File | null = null;
  recoleccionEspecimenes: string = '';
  tipoEspecimen: string = '';

  duracionMeses: number | null = null;
  nombreActividad: string = '';
  fechaInicioActividad: string = '';
  fechaFinActividad: string = '';

  centroCosto: string = '';
}
