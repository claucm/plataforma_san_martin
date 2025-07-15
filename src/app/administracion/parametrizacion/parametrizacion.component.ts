import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametrizacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrizacion.component.html',
  styleUrls: ['./parametrizacion.component.css']
})
export class ParametrizacionComponent {
  modules = {
    'Usuarios': {
      'tipoIdentificacion': ['CC', 'Pasaporte'],
      'estado': ['Activo', 'Inactivo'],
      'sede': ['Bogotá', 'Cali', 'Pasto', 'Puerto Colombia', 'Sabaneta'],
      'facultad': [
        'Facultad de Ingeniería',
        'Facultad de Ciencias Sociales',
        'Facultad de Medicina',
        'Facultad de Derecho',
        'Facultad de Ciencias Económicas',
        'Facultad de Ciencias Agrarias',
        'Facultad de Educación',
        'Facultad de Ciencias Básicas',
        'Facultad de Arquitectura',
        'Facultad de Artes'
      ],
      'programa': [
        'Ingeniería Civil',
        'Ingeniería de Sistemas',
        'Ingeniería Electrónica',
        'Sociología',
        'Trabajo Social',
        'Medicina General',
        'Enfermería',
        'Derecho Penal',
        'Derecho Civil',
        'Economía',
        'Administración de Empresas',
        'Agronomía',
        'Zootecnia',
        'Educación Básica',
        'Educación Infantil',
        'Matemáticas',
        'Física',
        'Arquitectura',
        'Diseño Urbano',
        'Artes Plásticas',
        'Música'
      ],
      'cargo': ['Docente', 'Financiera'],
      'statusRoles': ['Activo', 'Inactivo'],
      'modulesRoles': ['Inicio', 'Seguridad', 'Investigación', 'Extensión', 'Indicadores']
    },
    'Investigación': {
      'areasConocimiento': ['Ciencias Sociales', 'Ingeniería', 'Salud'],
      'facultades': ['Facultad 1', 'Facultad 2', 'Facultad 3'],
      'programas': ['Programa 1', 'Programa 2', 'Programa 3'],
      'sedes': ['Sede 1', 'Sede 2', 'Sede 3'],
      'gruposInvestigacion': ['Grupo 1', 'Grupo 2', 'Grupo 3'],
      'lineas': ['Línea Institucional', 'Línea Facultad', 'Ambas'],
    }
  };

  // Icons for modules
  getModuleIcon(module: string): string {
    switch(module) {
      case 'Usuarios':
        return 'fas fa-users';
      case 'Investigación':
        return 'fas fa-flask';
      default:
        return 'fas fa-folder';
    }
  }

  // Labels for modules (can be customized)
  getModuleLabel(module: string): string {
    switch(module) {
      case 'Usuarios':
        return 'Usuarios';
      case 'Investigación':
        return 'Investigación';
      default:
        return module;
    }
  }

  // Labels for categories with more context
  getCategoryLabel(category: string): string {
    const labels: {[key: string]: string} = {
      tipoIdentificacion: 'Tipo de Identificación',
      estado: 'Estado',
      sede: 'Sede',
      facultad: 'Facultad',
      programa: 'Programa',
      cargo: 'Cargo',
      statusRoles: 'Estado de Roles',
      modulesRoles: 'Módulos de Roles',
      areasConocimiento: 'Áreas de Conocimiento',
      facultades: 'Facultades',
      programas: 'Programas',
      sedes: 'Sedes',
      gruposInvestigacion: 'Grupos de Investigación',
      lineas: 'Líneas',
    };
    return labels[category] || category;
  }

  // Descriptions for categories
  getCategoryDescription(category: string): string {
    const descriptions: {[key: string]: string} = {
      areasConocimiento: 'Personaliza las categorías disponibles para los formularios de investigación',
      facultades: 'Facultades disponibles para selección',
      programas: 'Programas disponibles para selección',
      sedes: 'Sedes disponibles para selección',
      gruposInvestigacion: 'Grupos de investigación disponibles',
      lineas: 'Líneas de investigación disponibles',
      tipoIdentificacion: 'Tipos de identificación para usuarios',
      estado: 'Estados posibles para usuarios',
      cargo: 'Cargos disponibles para usuarios',
      statusRoles: 'Estados posibles para roles',
      modulesRoles: 'Módulos disponibles para roles',
    };
    return descriptions[category] || '';
  }

  // Inline editing state
  editing: {[key: string]: number | null} = {};
  editValue: string = '';
  deleteCategory: string = '';
  deleteIndex: number = -1;

  isEditing(category: string, index: number): boolean {
    return this.editing[category] === index;
  }

  enableEdit(category: string, index: number): void {
    this.editing[category] = index;
    const options = this.getOptions(category);
    this.editValue = options[index];
  }

  saveEdit(category: string, index: number): void {
    if (!this.editValue.trim()) {
      this.cancelEdit(category);
      return;
    }
    const options = this.getOptions(category);
    options[index] = this.editValue.trim();
    this.editing[category] = null;
    this.editValue = '';
  }

  cancelEdit(category: string): void {
    this.editing[category] = null;
    this.editValue = '';
  }

  confirmDelete(category: string, index: number): void {
    this.deleteCategory = category;
    this.deleteIndex = index;
    // Show modal (assuming Bootstrap modal)
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
  }

  deleteConfirmed(): void {
    if (this.deleteCategory && this.deleteIndex > -1) {
      this.removeOption(this.deleteCategory, this.deleteIndex);
    }
    this.deleteCategory = '';
    this.deleteIndex = -1;
    // Hide modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.hide();
  }

  modulesKeys = Object.keys(this.modules);

  selectedModule: string = 'Usuarios';
  newOption: string = '';

  getCategories(): string[] {
    return Object.keys(this.modules[this.selectedModule as keyof typeof this.modules]);
  }

  getOptions(category: string): string[] {
    const module = this.modules[this.selectedModule as keyof typeof this.modules];
    return module[category as keyof typeof module] || [];
  }

  addOption(category: string) {
    if (!this.newOption.trim()) {
      return;
    }
    const module = this.modules[this.selectedModule as keyof typeof this.modules];
    const options = module[category as keyof typeof module] as string[];
    options.push(this.newOption.trim());
    this.newOption = '';
  }

  removeOption(category: string, index: number) {
    const module = this.modules[this.selectedModule as keyof typeof this.modules];
    const options = module[category as keyof typeof module] as string[];
    options.splice(index, 1);
  }

  selectModule(moduleName: string) {
    this.selectedModule = moduleName;
    this.newOption = '';
  }
}
