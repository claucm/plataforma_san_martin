import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos-tab-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos-tab-form.component.html',
  styleUrls: ['./productos-tab-form.component.css']
})
export class ProductosTabFormComponent {
  @Input() productoData: any;
  @Output() formSubmit = new EventEmitter<any>();

  tiposProducto = [
    'Artículo científico',
    'Libro resultado de investigación',
    'Capítulo de libro',
    'Patente',
    'Software',
    'Prototipo industrial'
  ];

  contenidosPublicados = [
    'Publicado',
    'En prensa',
    'Aceptado',
    'En revisión'
  ];

  paises = [
    'Colombia',
    'Argentina',
    'Brasil',
    'Chile',
    'México',
    'España',
    'Estados Unidos'
  ];

  productoForm: FormGroup = this.fb.group({
    producto: ['', Validators.required],
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.productoData) {
      this.productoForm.patchValue(this.productoData);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    const currentAnexos = this.productoForm.get('anexos')?.value || [];
    this.productoForm.patchValue({
      anexos: [...currentAnexos, ...Array.from(files)]
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      this.formSubmit.emit(this.productoForm.value);
    } else {
      this.marcarCamposInvalidos();
    }
  }

  private marcarCamposInvalidos() {
    Object.keys(this.productoForm.controls).forEach(key => {
      const control = this.productoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }
}