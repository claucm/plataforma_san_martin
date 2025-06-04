import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  activeTab: string = 'basic-info';

  unassignedRoles = [
    { code: '0001', name: 'Administrador técnico' },
    { code: '0002', name: 'Investigador' },
    { code: '0003', name: 'Vicerrector Académico' }
  ];

  assignedRoles = [
    { code: '0004', name: 'Director Investigación' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  assignRole() {
    // TODO: Implement logic to assign selected role from unassignedRoles to assignedRoles
    console.log('Assign role clicked');
  }

  unassignRole() {
    // TODO: Implement logic to unassign selected role from assignedRoles to unassignedRoles
    console.log('Unassign role clicked');
  }

  unassignedPermissions = [
    { type: 'Sede', code: '11', name: 'Bogotá' },
    { type: 'Sede', code: '12', name: 'Cali' },
    { type: 'Facultad', code: '1', name: 'Ciencias sociales' },
    { type: 'Programa', code: '10', name: 'Medicina' }
  ];

  assignedPermissions = [
    { type: 'Sede', code: '13', name: 'Puerto Colombia' }
  ];

  assignPermission() {
    // TODO: Implement logic to assign selected permission from unassignedPermissions to assignedPermissions
    console.log('Assign permission clicked');
  }

  unassignPermission() {
    // TODO: Implement logic to unassign selected permission from assignedPermissions to unassignedPermissions
    console.log('Unassign permission clicked');
  }
}
