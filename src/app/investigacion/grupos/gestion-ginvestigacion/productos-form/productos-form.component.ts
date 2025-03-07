import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProyectoFormComponent } from '../proyecto-form/proyecto-form.component';
import { ProductosTabFormComponent } from '../productos-tab-form/productos-tab-form.component';
import { SemilleroFormComponent } from '../semillero-form/semillero-form.component';

interface Producto {
  tipo: string;
  tipoProducto: string;
  titulo: string;
  fechaInicio: Date;
  fechaTerminacion: Date;
  contenidoPublicado: string;
  isbn: string;
  isi: string;
  scopus: string;
  paginaInicial: string;
  paginaFinal: string;
  fechaPublicacionMemorias: Date;
  editorialMemorias: string;
  pais: string;
  anexos: string[];
}

interface Proyecto {
  codigo: string;
  titulo: string;
  estado: string;
  paginaWeb: string;
  convocatoria: string;
  duracionPrevista: number;
  duracionProrrogas: number;
  fechaInicio: Date;
  fechaTerminacion: Date;
  cumplimiento: string;
  codigoExterno: string;
  investigacionFormativa: boolean;
  interdisciplinario: boolean;
  intergrupos: boolean;
  monografias: string;
  rolFUSM: string;
  objetivoGeneral: string;
  palabrasClave: string[];
  resumen: string;
  observaciones: string;
}

interface Semillero {
  nombre: string;
  estado: string;
  integrantes: string[];
  productos: Producto[];
}

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ProyectoFormComponent,
    ProductosTabFormComponent,
    SemilleroFormComponent

  ],

  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent {
  @Input() grupoData: any;
  @Input() proyectoData: any;
  @Input() productoData: any;
  @Input() semilleroData: any;
  @Output() formSubmit = new EventEmitter<any>();

  // Pestaña activa
  subTabActiva = 'productos';

  // Listas para los selectores
  estados = ['Activo', 'Inactivo', 'Finalizado', 'En proceso'];
  tiposProducto = ['Artículo', 'Libro', 'Capítulo de libro', 'Patente', 'Software'];
  paises = ['Colombia', 'México', 'Argentina', 'España', 'Estados Unidos'];
  estadosSemillero = ['Activo', 'Inactivo', 'Cerrado'];
  rolesProyecto = ['Investigador Principal', 'Coinvestigador', 'Auxiliar'];

  productosForm: FormGroup = this.fb.group({
    // Información del proyecto
    codigoProyecto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    titulo: ['', Validators.required],
    estado: ['', Validators.required],
    paginaWeb: [''],
    convocatoria: ['', Validators.required],
    duracionPrevista: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    duracionProrrogas: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    fechaInicio: ['', Validators.required],
    fechaTerminacion: ['', Validators.required],
    cumplimiento: ['', Validators.required],
    codigoExterno: ['', Validators.pattern('^[0-9]*$')],
    investigacionFormativa: [false],
    interdisciplinario: [false],
    intergrupos: [false],
    monografias: [''],
    rolFUSM: ['', Validators.required],
    objetivoGeneral: ['', Validators.required],
    palabrasClave: ['', Validators.required],
    resumen: ['', Validators.required],
    observaciones: [''],

    // Array de productos
    productos: this.fb.array([]),

    // Array de semilleros
    semilleros: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {}

  // Getters para los FormArrays
  get productos() {
    return this.productosForm.get('productos') as FormArray;
  }

  get semilleros() {
    return this.productosForm.get('semilleros') as FormArray;
  }

  // Método para cambiar entre pestañas
  cambiarSubTab(tab: string) {
    this.subTabActiva = tab;
  }

  // Métodos para agregar elementos
  agregarProducto() {
    const productoGroup = this.fb.group({
      tipo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      titulo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTerminacion: ['', Validators.required],
      contenidoPublicado: ['', Validators.required],
      isbn: [''],
      isi: [''],
      scopus: [''],
      paginaInicial: [''],
      paginaFinal: [''],
      fechaPublicacionMemorias: [''],
      editorialMemorias: [''],
      pais: ['', Validators.required],
      anexos: [[]]
    });
    this.productos.push(productoGroup);
  }

  agregarSemillero() {
    const semilleroGroup = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      integrantes: this.fb.array([]),
      productos: this.fb.array([])
    });
    this.semilleros.push(semilleroGroup);
  }

  // Métodos para remover elementos
  removerProducto(index: number) {
    this.productos.removeAt(index);
  }

  removerSemillero(index: number) {
    this.semilleros.removeAt(index);
  }

  // Método para validar fechas
  validarFechas(group: FormGroup) {
    const fechaInicio = group.get('fechaInicio')?.value;
    const fechaTerminacion = group.get('fechaTerminacion')?.value;
    if (fechaInicio && fechaTerminacion) {
      return fechaInicio <= fechaTerminacion ? null : { fechasInvalidas: true };
    }
    return null;
  }

  // Método para manejar el envío del formulario de proyecto
  handleProyectoSubmit(formData: any) {
    console.log('Proyecto guardado:', formData);
    this.formSubmit.emit(formData);
  }

  // Método para manejar el envío del formulario de producto
  handleProductoSubmit(formData: any) {
    console.log('Producto guardado:', formData);
    this.formSubmit.emit(formData);
  }
  
  // Método para manejar el envío del formulario de semillero
  handleSemilleroSubmit(formData: any) {
    console.log('Semillero guardado:', formData);
    this.formSubmit.emit(formData);
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.productosForm.valid) {
      const formData = this.productosForm.value;
      console.log('Datos del formulario:', formData);
      this.formSubmit.emit(formData);
    } else {
      this.marcarCamposInvalidos(this.productosForm);
    }
  }

  // Método auxiliar para marcar campos inválidos
  private marcarCamposInvalidos(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.marcarCamposInvalidos(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}