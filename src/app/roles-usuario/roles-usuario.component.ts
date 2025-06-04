import { Component } from '@angular/core';

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.css']
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
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
