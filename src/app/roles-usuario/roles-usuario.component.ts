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

  unassignedUsers = [
    { code: 'U001', name: 'Usuario 1' },
    { code: 'U002', name: 'Usuario 2' }
  ];

  assignedUsers = [
    { code: 'U003', name: 'Usuario 3' }
  ];

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
    executeOption: false,
    readPermission: true,
    insertPermission: false,
    updatePermission: true,
    deletePermission: false
  };

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

  selectModule(module: any) {
    this.selectedModule = module;
    // TODO: Load permissions for the selected module and role
    console.log('Selected module:', module);
  }

  togglePermission(permission: keyof typeof this.permissions) {
    this.permissions[permission] = !this.permissions[permission];
    console.log('Toggled permission:', permission, 'New value:', this.permissions[permission]);
  }

  assignUser() {
    // TODO: Implement logic to assign selected user from unassignedUsers to assignedUsers
    console.log('Assign user clicked');
  }

  unassignUser() {
    // TODO: Implement logic to unassign selected user from assignedUsers to unassignedUsers
    console.log('Unassign user clicked');
  }

  assignPermission() {
    // TODO: Implement logic to assign selected permission from unassignedPermissions to assignedPermissions
    console.log('Assign permission clicked');
  }

  unassignPermission() {
    // TODO: Implement logic to unassign selected permission from assignedPermissions to unassignedPermissions
    console.log('Unassign permission clicked');
  }
}
