import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  codigo: number;
  documento: string;
  tipoIdentificacion: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  sede: string;
  facultad: string;
  programa?: string;
  cargo: string;
  fullName: string;
  status: 'Activo' | 'Inactivo';
  email: string;
  creationDate: string; // ISO date string
  lastActive: string; // ISO time string
  photoUrl: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  activeTab: string = 'basic-info';

  users: User[] = [
    {
      codigo: 1,
      documento: '123456789',
      fullName: 'Juan Pérez',
      tipoIdentificacion: 'CC',
      primerNombre: 'Juan',
      segundoNombre: '',
      primerApellido: 'Pérez',
      segundoApellido: '',
      status: 'Activo',
      email: 'juan.perez@example.com',
      creationDate: '2023-01-15',
      lastActive: '14:30',
      sede: '',
      facultad: '',
      cargo: '',
      photoUrl: 'assets/perfil2.jpeg'
    },
    {
      codigo: 2,
      documento: '987654321',
      fullName: 'María Gómez',
      tipoIdentificacion: 'CC',
      primerNombre: 'María',
      segundoNombre: '',
      primerApellido: 'Gómez',
      segundoApellido: '',
      status: 'Inactivo',
      email: 'maria.gomez@example.com',
      creationDate: '2022-11-20',
      lastActive: '09:15',
      sede: '',
      facultad: '',
      cargo: '',
      photoUrl: 'assets/perfil1.jpg'
    },
    {
      codigo: 3,
      documento: '456789123',
      fullName: 'Carlos López',
      tipoIdentificacion: 'CC',
      primerNombre: 'Carlos',
      segundoNombre: '',
      primerApellido: 'López',
      segundoApellido: '',
      status: 'Activo',
      email: 'carlos.lopez@example.com',
      creationDate: '2023-03-05',
      lastActive: '16:45',
      sede: '',
      facultad: '',
      cargo: '',
      photoUrl: 'assets/perfil3.jpg'
    }
  ];

  filterDocumento: string = '';
  filterName: string = '';
  filterStatus: string = '';
  filterEmail: string = '';
  filterCreationDate: string = '';
  filterLastActive: string = '';

  showCreateUserModal: boolean = false;

  newUser = {
    codigo: 0,
    tipoIdentificacion: 'CC',
    identificacion: '',
    estado: 'Activo',
    sede: '',
    facultad: '',
    programa: '',
    cargo: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: ''
  };

  facultadesBySede: { [key: string]: string[] } = {
    'Bogotá': ['Facultad de Ingeniería', 'Facultad de Ciencias Sociales', 'Facultad de Medicina'],
    'Cali': ['Facultad de Derecho', 'Facultad de Ciencias Económicas'],
    'Pasto': ['Facultad de Ciencias Agrarias', 'Facultad de Educación'],
    'Puerto Colombia': ['Facultad de Ciencias Básicas'],
    'Sabaneta': ['Facultad de Arquitectura', 'Facultad de Artes']
  };

  programsByFacultad: { [key: string]: string[] } = {
    'Facultad de Ingeniería': ['Ingeniería Civil', 'Ingeniería de Sistemas', 'Ingeniería Electrónica'],
    'Facultad de Ciencias Sociales': ['Sociología', 'Trabajo Social'],
    'Facultad de Medicina': ['Medicina General', 'Enfermería'],
    'Facultad de Derecho': ['Derecho Penal', 'Derecho Civil'],
    'Facultad de Ciencias Económicas': ['Economía', 'Administración de Empresas'],
    'Facultad de Ciencias Agrarias': ['Agronomía', 'Zootecnia'],
    'Facultad de Educación': ['Educación Básica', 'Educación Infantil'],
    'Facultad de Ciencias Básicas': ['Matemáticas', 'Física'],
    'Facultad de Arquitectura': ['Arquitectura', 'Diseño Urbano'],
    'Facultad de Artes': ['Artes Plásticas', 'Música']
  };
  
  facultadesFiltered: string[] = [];
  facultadesFilteredForSelectedUser: string[] = [];

  programsFiltered: string[] = [];
  programsFilteredForSelectedUser: string[] = [];

  onSedeChange(): void {
    if (this.newUser.sede && this.facultadesBySede[this.newUser.sede]) {
      this.facultadesFiltered = this.facultadesBySede[this.newUser.sede];
      if (!this.facultadesFiltered.includes(this.newUser.facultad)) {
        this.newUser.facultad = '';
        this.newUser.programa = '';
        this.programsFiltered = [];
      } else {
        this.onFacultadChange();
      }
    } else {
      this.facultadesFiltered = [];
      this.newUser.facultad = '';
      this.newUser.programa = '';
      this.programsFiltered = [];
    }
  }
  
  onSelectedUserSedeChange(): void {
    if (this.selectedUser && this.selectedUser.sede && this.facultadesBySede[this.selectedUser.sede]) {
      this.facultadesFilteredForSelectedUser = this.facultadesBySede[this.selectedUser.sede];
      if (!this.facultadesFilteredForSelectedUser.includes(this.selectedUser.facultad)) {
        this.selectedUser.facultad = '';
        this.selectedUser.programa = '';
        this.programsFilteredForSelectedUser = [];
      } else {
        this.onSelectedUserFacultadChange();
      }
    } else {
      this.facultadesFilteredForSelectedUser = [];
      if (this.selectedUser) {
        this.selectedUser.facultad = '';
        this.selectedUser.programa = '';
        this.programsFilteredForSelectedUser = [];
      }
    }
  }

  onFacultadChange(): void {
    if (this.newUser.facultad && this.programsByFacultad[this.newUser.facultad]) {
      this.programsFiltered = this.programsByFacultad[this.newUser.facultad];
      if (!this.programsFiltered.includes(this.newUser.programa ?? '')) {
        this.newUser.programa = '';
      }
    } else {
      this.programsFiltered = [];
      this.newUser.programa = '';
    }
  }

  onSelectedUserFacultadChange(): void {
    if (this.selectedUser && this.selectedUser.facultad && this.programsByFacultad[this.selectedUser.facultad]) {
      this.programsFilteredForSelectedUser = this.programsByFacultad[this.selectedUser.facultad];
      if (!this.programsFilteredForSelectedUser.includes(this.selectedUser.programa ?? '')) {
        this.selectedUser.programa = '';
      }
    } else {
      this.programsFilteredForSelectedUser = [];
      if (this.selectedUser) {
        this.selectedUser.programa = '';
      }
    }
  }
  
  createUser(): void {
    const maxCodigo = this.users.reduce((max, user) => user.codigo > max ? user.codigo : max, 0);
    this.newUser.codigo = maxCodigo + 1;

    const fullName = [this.newUser.primerNombre, this.newUser.segundoNombre, this.newUser.primerApellido, this.newUser.segundoApellido]
      .filter(name => !!name)
      .join(' ');

    this.users.push({
      codigo: this.newUser.codigo,
      documento: this.newUser.identificacion,
      sede: this.newUser.sede,
      facultad: this.newUser.facultad,
      programa: this.newUser.programa,
      cargo: this.newUser.cargo,
      fullName: fullName,
      tipoIdentificacion: this.newUser.tipoIdentificacion,
      primerNombre: this.newUser.primerNombre,
      segundoNombre: this.newUser.segundoNombre,
      primerApellido: this.newUser.primerApellido,
      segundoApellido: this.newUser.segundoApellido,
      status: this.newUser.estado === 'Activo' ? 'Activo' : 'Inactivo',
      email: this.newUser.email,
      creationDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toLocaleTimeString(),
      photoUrl: 'assets/student.png'
    });

    console.log('Crear usuario:', this.newUser);
    this.closeCreateUserModal();

    this.newUser = {
      codigo: 0,
      tipoIdentificacion: 'CC',
      identificacion: '',
      estado: 'Activo',
      sede: '',
      facultad: '',
      programa: '',
      cargo: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      email: ''
    };
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    this.selectedUser.fullName = [
      this.selectedUser.primerNombre,
      this.selectedUser.segundoNombre,
      this.selectedUser.primerApellido,
      this.selectedUser.segundoApellido
    ].filter(name => !!name).join(' ');

    const index = this.users.findIndex(u => u.codigo === this.selectedUser!.codigo);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser };
    }
    console.log('Usuario guardado:', this.selectedUser);
  }

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesDocumento = this.filterDocumento ? user.documento.toLowerCase().includes(this.filterDocumento.toLowerCase()) : true;
      const matchesName = user.fullName.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesStatus = this.filterStatus ? user.status === this.filterStatus : true;
      const matchesEmail = user.email.toLowerCase().includes(this.filterEmail.toLowerCase());
      const matchesCreationDate = this.filterCreationDate ? user.creationDate === this.filterCreationDate : true;
      const matchesLastActive = this.filterLastActive ? user.lastActive === this.filterLastActive : true;
      return matchesDocumento && matchesName && matchesStatus && matchesEmail && matchesCreationDate && matchesLastActive;
    });
  }

  selectedUser: User | null = null;

  selectedUserAdditionalInfo: { sede: string; facultad: string; programa: string }[] = [];
  showAddAdditionalInfoModal: boolean = false;
  newAdditionalInfo = {
    sede: '',
    facultad: '',
    programa: ''
  };
  additionalFacultadesFiltered: string[] = [];
  additionalProgramsFiltered: string[] = [];

  selectUser(user: User): void {
    this.selectedUser = {
      ...user,
      sede: user.sede || '',
      facultad: user.facultad || '',
      programa: user.programa || '',
      cargo: user.cargo || ''
    };
    // Initialize additional info array from user data if available
    this.selectedUserAdditionalInfo = [];
    if (this.selectedUser.sede && this.selectedUser.facultad && this.selectedUser.programa) {
      this.selectedUserAdditionalInfo.push({
        sede: this.selectedUser.sede,
        facultad: this.selectedUser.facultad,
        programa: this.selectedUser.programa
      });
    }
    console.log('Seleccionar usuario:', this.selectedUser);
  }

  openCreateUserModal(): void {
    console.log('openCreateUserModal called');
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    console.log('closeCreateUserModal called');
    this.showCreateUserModal = false;
  }

  cancelEdit(): void {
    if (!this.selectedUser) return;
    const original = this.users.find(u => u.codigo === this.selectedUser!.codigo);
    if (original) {
      this.selectedUser = { ...original };
    }
  }

  // New properties for roles and permissions
  unassignedRoles = [
    { code: 'R1', name: 'Admin' },
    { code: 'R2', name: 'Editor' },
    { code: 'R3', name: 'Viewer' }
  ];
  assignedRoles = [
    { code: 'R4', name: 'Contributor' }
  ];

  unassignedPermissions = [
    { type: 'Read', code: 'P1', name: 'Read Articles' },
    { type: 'Write', code: 'P2', name: 'Write Articles' },
    { type: 'Delete', code: 'P3', name: 'Delete Articles' }
  ];
  assignedPermissions = [
    { type: 'Read', code: 'P4', name: 'Read Comments' }
  ];

  selectedUnassignedRoles: any[] = [];
  selectedAssignedRoles: any[] = [];
  selectedUnassignedPermissions: any[] = [];
  selectedAssignedPermissions: any[] = [];

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  }

  isUnassignedRoleSelected(role: any): boolean {
    return this.selectedUnassignedRoles.includes(role);
  }

  isAssignedRoleSelected(role: any): boolean {
    return this.selectedAssignedRoles.includes(role);
  }

  onUnassignedRoleCheckboxChange(event: any, role: any): void {
    if (event.target.checked) {
      this.selectedUnassignedRoles.push(role);
    } else {
      this.selectedUnassignedRoles = this.selectedUnassignedRoles.filter(r => r !== role);
    }
  }

  onAssignedRoleCheckboxChange(event: any, role: any): void {
    if (event.target.checked) {
      this.selectedAssignedRoles.push(role);
    } else {
      this.selectedAssignedRoles = this.selectedAssignedRoles.filter(r => r !== role);
    }
  }

  assignRole(): void {
    if (this.selectedUnassignedRoles.length > 0) {
      this.assignedRoles.push(...this.selectedUnassignedRoles);
      this.unassignedRoles = this.unassignedRoles.filter(role => !this.selectedUnassignedRoles.includes(role));
      this.selectedUnassignedRoles = [];
    }
  }

  unassignRole(): void {
    if (this.selectedAssignedRoles.length > 0) {
      this.unassignedRoles.push(...this.selectedAssignedRoles);
      this.assignedRoles = this.assignedRoles.filter(role => !this.selectedAssignedRoles.includes(role));
      this.selectedAssignedRoles = [];
    }
  }

  getFirstNames(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    return parts.slice(0, parts.length - 1).join(' ');
  }

  getLastNames(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  assignPermission(): void {
    if (this.selectedUnassignedPermissions.length > 0) {
      this.assignedPermissions.push(...this.selectedUnassignedPermissions);
      this.unassignedPermissions = this.unassignedPermissions.filter(permission => !this.selectedUnassignedPermissions.includes(permission));
      this.selectedUnassignedPermissions = [];
    }
  }

  unassignPermission(): void {
    if (this.selectedAssignedPermissions.length > 0) {
      this.unassignedPermissions.push(...this.selectedAssignedPermissions);
      this.assignedPermissions = this.assignedPermissions.filter(permission => !this.selectedAssignedPermissions.includes(permission));
      this.selectedAssignedPermissions = [];
    }
  }

  isUnassignedPermissionSelected(permission: any): boolean {
    return this.selectedUnassignedPermissions.includes(permission);
  }

  isAssignedPermissionSelected(permission: any): boolean {
    return this.selectedAssignedPermissions.includes(permission);
  }

  onUnassignedPermissionCheckboxChange(event: any, permission: any): void {
    if (event.target.checked) {
      this.selectedUnassignedPermissions.push(permission);
    } else {
      this.selectedUnassignedPermissions = this.selectedUnassignedPermissions.filter(p => p !== permission);
    }
  }

  onAssignedPermissionCheckboxChange(event: any, permission: any): void {
    if (event.target.checked) {
      this.selectedAssignedPermissions.push(permission);
    } else {
      this.selectedAssignedPermissions = this.selectedAssignedPermissions.filter(p => p !== permission);
    }
  }

  removeAdditionalInfo(index: number): void {
    this.selectedUserAdditionalInfo.splice(index, 1);
  }

  openAddAdditionalInfoModal(): void {
    this.showAddAdditionalInfoModal = true;
  }

  facultadesFilteredForEntry: string[][] = [];
  programsFilteredForEntry: string[][] = [];

  addAdditionalInfo(): void {
    this.selectedUserAdditionalInfo.push({
      sede: '',
      facultad: '',
      programa: ''
    });
    this.facultadesFilteredForEntry.push([]);
    this.programsFilteredForEntry.push([]);
  }

  onEntrySedeChange(index: number): void {
    const entry = this.selectedUserAdditionalInfo[index];
    if (entry.sede && this.facultadesBySede[entry.sede]) {
      this.facultadesFilteredForEntry[index] = this.facultadesBySede[entry.sede];
      if (!this.facultadesFilteredForEntry[index].includes(entry.facultad)) {
        entry.facultad = '';
        entry.programa = '';
        this.programsFilteredForEntry[index] = [];
      }
    } else {
      this.facultadesFilteredForEntry[index] = [];
      entry.facultad = '';
      entry.programa = '';
      this.programsFilteredForEntry[index] = [];
    }
  }

  onEntryFacultadChange(index: number): void {
    const entry = this.selectedUserAdditionalInfo[index];
    if (entry.facultad && this.programsByFacultad[entry.facultad]) {
      this.programsFilteredForEntry[index] = this.programsByFacultad[entry.facultad];
      if (!this.programsFilteredForEntry[index].includes(entry.programa)) {
        entry.programa = '';
      }
    } else {
      this.programsFilteredForEntry[index] = [];
      entry.programa = '';
    }
  }

  deactivateSede(index: number): void {
    // Implement the logic to deactivate the site (sede) for the entry at the given index
    // For now, just log the action
    console.log(`Desactivar sede for entry at index ${index}`, this.selectedUserAdditionalInfo[index]);
    // Example: mark the entry as deactivated or remove it, depending on requirements
    // Here, we just add a property 'deactivated' to the entry
    if (this.selectedUserAdditionalInfo[index]) {
      (this.selectedUserAdditionalInfo[index] as any).deactivated = true;
    }
  }
}
