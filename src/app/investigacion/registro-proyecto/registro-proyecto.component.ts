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

  onFileSelected: any = (event: any) => {
    const file: File = event.target.files[0];
    // Implement file handling logic here
    console.log('Archivo seleccionado:', file);
  };

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
    this.lugaresEjecucion.push({ departamento: '', ciudad: '', institucion: '', duracion: 0 });
  }

  removeLugarEjecucion(index: number) {
    this.lugaresEjecucion.splice(index, 1);
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