import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';

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

interface AssignedRole {
  id: number;
  name: string;
  sede: string;
  userCodigo: number;
  active?: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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

  filteredUsers: User[] = [];

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

  selectedUser: User | null = null;

  selectedUserAdditionalInfo: { sede: string; facultad: string; programa: string }[] = [];
  showAddAdditionalInfoModal: boolean = false;
  newAdditionalInfo = {
    sede: '',
    facultad: '',
    programa: ''
  };
  additionalFacultadesFiltered: string[] = [];
  programsFilteredForEntry: string[][] = [];
  facultadesFilteredForEntry: string[][] = [];

  unassignedRoles = [
    { code: 'R1', name: 'Admin' },
    { code: 'R2', name: 'Editor' },
    { code: 'R3', name: 'Viewer' }
  ];
  assignedRoles: AssignedRole[] = [
    { id: 4, name: 'Contributor', sede: '', userCodigo: 0 }
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

  selectedRole: Role | null = null;
  selectedSede: string = '';

  roles: Role[] = [];

  constructor(private roleService: RoleService) {
    this.filteredUsers = this.users;
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.roles = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      }
    });
  }

  addRoleToUser(): void {
    if (this.selectedUser && this.selectedRole && this.selectedSede) {
      // Check if the user already has this role assigned for the selected sede
      const existingRole = this.assignedRoles.find(
        r => r.id === this.selectedRole!.id && r.sede === this.selectedSede && r.userCodigo === this.selectedUser!.codigo
      );
      if (existingRole) {
        alert('El usuario ya tiene asignado este rol para la sede seleccionada.');
        return;
      }
      // Assign the role to the user for the selected sede
      const newAssignedRole: AssignedRole = {
        id: this.selectedRole.id!,
        name: this.selectedRole.name,
        sede: this.selectedSede,
        userCodigo: this.selectedUser.codigo,
        active: true
      };
      this.assignedRoles.push(newAssignedRole);
      alert(`Rol "${this.selectedRole.name}" asignado a la sede "${this.selectedSede}" para el usuario.`);
      // Optionally reset selections
      this.selectedRole = null;
      this.selectedSede = '';
    } else {
      alert('Por favor seleccione un usuario, un rol y una sede antes de añadir.');
    }
  }

  removeAssignedRole(role: AssignedRole): void {
    this.assignedRoles = this.assignedRoles.filter(r => r !== role);
  }

  deactivateAssignedRole(role: AssignedRole): void {
    const index = this.assignedRoles.findIndex(r => r === role);
    if (index !== -1) {
      this.assignedRoles[index].active = false;
      alert(`Rol "${role.name}" desactivado para la sede "${role.sede}".`);
    }
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  }

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

  removeAdditionalInfo(index: number): void {
    this.selectedUserAdditionalInfo.splice(index, 1);
  }

  deactivateSede(index: number): void {
    console.log(`Desactivar sede for entry at index ${index}`, this.selectedUserAdditionalInfo[index]);
    if (this.selectedUserAdditionalInfo[index]) {
      (this.selectedUserAdditionalInfo[index] as any).deactivated = true;
    }
  }

  addAdditionalInfo(): void {
    this.selectedUserAdditionalInfo.push({
      sede: '',
      facultad: '',
      programa: ''
    });
    this.facultadesFilteredForEntry.push([]);
    this.programsFilteredForEntry.push([]);
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesDocumento = this.filterDocumento ? user.documento.toLowerCase().includes(this.filterDocumento.toLowerCase()) : true;
      const matchesName = this.filterName ? user.fullName.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      const matchesStatus = this.filterStatus ? user.status === this.filterStatus : true;
      const matchesEmail = this.filterEmail ? user.email.toLowerCase().includes(this.filterEmail.toLowerCase()) : true;
      const matchesCreationDate = this.filterCreationDate ? user.creationDate === this.filterCreationDate : true;
      return matchesDocumento && matchesName && matchesStatus && matchesEmail && matchesCreationDate;
    });
  }

  openCreateUserModal(): void {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    this.showCreateUserModal = false;
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
    this.filterUsers();
  }

  selectUser(user: User): void {
    this.selectedUser = {
      ...user,
      sede: user.sede || '',
      facultad: user.facultad || '',
      programa: user.programa || '',
      cargo: user.cargo || ''
    };
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
    this.filterUsers();
  }

  cancelEdit(): void {
    if (!this.selectedUser) return;
    const original = this.users.find(u => u.codigo === this.selectedUser!.codigo);
    if (original) {
      this.selectedUser = { ...original };
    }
  }
}
