import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RolesUsuarioComponent {
  activeTab: string = 'basic-info';

  roles = [
    { code: '00001', name: 'Administrador Técnico', description: 'Rol encargado de administrar generalidades', creationDate: '21-05-2025', status: 'Activo' },
    { code: '00002', name: 'Investigador', description: 'Rol encargado de cargar proyectos', creationDate: '21-05-2025', status: 'Inactivo' },
    { code: '00003', name: 'Vicerrector Académico', description: 'Rol encargado de consultar indicadores', creationDate: '21-05-2025', status: 'Activo' },
    { code: '00004', name: 'Director investigación', description: 'Rol encargado de consultar y gestionar proyectos', creationDate: '21-05-2025', status: 'Activo' }
  ];

  sedes = [
    { code: '001', name: 'Sede Bogotá' },
    { code: '002', name: 'Sede Cali' },
    { code: '003', name: 'Sede Medellín' }
  ];

  selectedRoleForAssignment: string = '';
  selectedSedeForAssignment: string = '';

  unassignedUsers = [
    { cedula: '123456789', nombre: 'Usuario 1' },
    { cedula: '987654321', nombre: 'Usuario 2' },
    { cedula: '456789123', nombre: 'Usuario 3' }
  ];

  assignedUsers = [
    { cedula: '321654987', nombre: 'Usuario 4' }
  ];

  selectedUnassignedUsers: Set<string> = new Set();
  selectedAssignedUsers: Set<string> = new Set();

  filterUnassignedCedula: string = '';
  filterUnassignedNombre: string = '';
  filterAssignedCedula: string = '';
  filterAssignedNombre: string = '';

  get filteredUnassignedUsers() {
    return this.unassignedUsers.filter(user =>
      user.cedula.toLowerCase().includes(this.filterUnassignedCedula.toLowerCase()) &&
      user.nombre.toLowerCase().includes(this.filterUnassignedNombre.toLowerCase())
    );
  }

  get filteredAssignedUsers() {
    return this.assignedUsers.filter(user =>
      user.cedula.toLowerCase().includes(this.filterAssignedCedula.toLowerCase()) &&
      user.nombre.toLowerCase().includes(this.filterAssignedNombre.toLowerCase())
    );
  }


  toggleAssignedUserSelection(cedula: string, event: any) {
    if (event.target.checked) {
      this.selectedAssignedUsers.add(cedula);
    } else {
      this.selectedAssignedUsers.delete(cedula);
    }
  }

  eliminar() {
    console.log('Eliminar clicked for role:', this.selectedRoleForAssignment, 'and sede:', this.selectedSedeForAssignment);
    // Implement eliminar logic here
  }

  desactivarRol() {
    console.log('Desactivar rol clicked for role:', this.selectedRoleForAssignment, 'and sede:', this.selectedSedeForAssignment);
    // Implement desactivar rol logic here
  }

  anadirRol() {
    console.log('Añadir rol clicked');
    // Implement añadir rol logic here
  }

  modules = [
    { name: 'Inicio', children: [] },
    { name: 'Seguridad', children: [
      { name: 'Gestión de usuarios' },
      { name: 'Gestión de roles' },
      { name: 'Auditoría' }
    ]},
    { name: 'Investigación', children: [] },
    { name: 'Extensión', children: [] },
    { name: 'Indicadores', children: [] }
  ];

  selectedModule: any = null;

  permissions = {
    view: false,
    edit: false,
    modify: false,
    delete: false
  };

  assignedModules: {
    name: string;
    permissions: {
      view: boolean;
      edit: boolean;
      modify: boolean;
      delete: boolean;
    };
    submodules: {
      name: string;
      permissions: {
        view: boolean;
        edit: boolean;
        modify: boolean;
        delete: boolean;
      };
    }[];
  }[] = [];

  showCreateRoleForm: boolean = false;

  newRole = {
    code: '',
    creationDate: '',
    name: '',
    description: '',
    status: 'Activo'
  };

  selectedRole: any = null;

  filterStatus: string = '';

  filteredRoles = this.roles;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  selectModule(module: any) {
    this.selectedModule = module;
    // Reset permissions when module changes
    this.permissions = {
      view: false,
      edit: false,
      modify: false,
      delete: false
    };
  }

  togglePermission(permission: keyof typeof this.permissions) {
    this.permissions[permission] = !this.permissions[permission];
  }

  addModuleWithPermissions() {
    if (!this.selectedModule) return;

    // Initialize submodules with default permissions
    const submodulesWithPermissions = (this.selectedModule.children || []).map((sub: any) => ({
      name: sub.name,
      permissions: {
        view: false,
        edit: false,
        modify: false,
        delete: false
      }
    }));

    // Check if module already assigned
    const exists = this.assignedModules.find(m => m.name === this.selectedModule.name);
    if (exists) {
      // Update permissions and submodules
      exists.permissions = { ...this.permissions };
      exists.submodules = submodulesWithPermissions;
    } else {
      this.assignedModules.push({
        name: this.selectedModule.name,
        permissions: { ...this.permissions },
        submodules: submodulesWithPermissions
      });
    }

    // Reset selection and permissions
    this.selectedModule = null;
    this.permissions = {
      view: false,
      edit: false,
      modify: false,
      delete: false
    };
  }

  toggleSubmodulePermission(moduleName: string, submoduleName: string, permission: keyof typeof this.permissions) {
    const module = this.assignedModules.find(m => m.name === moduleName);
    if (!module) return;
    const submodule = module.submodules.find((s: any) => s.name === submoduleName);
    if (!submodule) return;
    submodule.permissions[permission] = !submodule.permissions[permission];
  }

  removeAssignedModule(moduleName: string) {
    this.assignedModules = this.assignedModules.filter(m => m.name !== moduleName);
  }

  filterRoles(): void {
    if (!this.filterStatus) {
      this.filteredRoles = this.roles;
    } else {
      this.filteredRoles = this.roles.filter(role => role.status === this.filterStatus);
    }
  }

  openCreateRoleForm(): void {
    this.showCreateRoleForm = true;
    this.newRole.code = this.generateNextCode();
    this.newRole.creationDate = this.getCurrentDate();
    this.newRole.name = '';
    this.newRole.description = '';
    this.newRole.status = 'Activo';
  }

  generateNextCode(): string {
    if (this.roles.length === 0) {
      return '00001';
    }
    const maxCode = this.roles.reduce((max, role) => {
      const codeNum = parseInt(role.code, 10);
      return codeNum > max ? codeNum : max;
    }, 0);
    const nextCodeNum = maxCode + 1;
    return nextCodeNum.toString().padStart(5, '0');
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  saveRole(): void {
    if (this.showCreateRoleForm) {
      this.roles.push({ ...this.newRole });
      this.showCreateRoleForm = false;
      this.selectRole(this.newRole);
      this.setActiveTab('basic-info');
    } else if (this.selectedRole) {
      // Update the selected role in the roles array
      const index = this.roles.findIndex(role => role.code === this.selectedRole.code);
      if (index !== -1) {
        this.roles[index] = { ...this.selectedRole };
      }
    }
  }

  cancelCreateRole(): void {
    this.showCreateRoleForm = false;
  }

  selectRole(role: any): void {
    this.selectedRole = role;
    this.setActiveTab('basic-info');
  }

  assignUser() {
    this.selectedUnassignedUsers.forEach(cedula => {
      const index = this.unassignedUsers.findIndex(u => u.cedula === cedula);
      if (index !== -1) {
        const user = this.unassignedUsers.splice(index, 1)[0];
        this.assignedUsers.push(user);
      }
    });
    this.selectedUnassignedUsers.clear();
  }

  unassignUser() {
    this.selectedAssignedUsers.forEach(cedula => {
      const index = this.assignedUsers.findIndex(u => u.cedula === cedula);
      if (index !== -1) {
        const user = this.assignedUsers.splice(index, 1)[0];
        this.unassignedUsers.push(user);
      }
    });
    this.selectedAssignedUsers.clear();
  }

  toggleUnassignedUserSelection(cedula: string, event: any) {
    if (event.target.checked) {
      this.selectedUnassignedUsers.add(cedula);
    } else {
      this.selectedUnassignedUsers.delete(cedula);
    }
  }
}
