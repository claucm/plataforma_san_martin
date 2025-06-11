import { Component } from '@angular/core';

interface User {
  fullName: string;
  status: 'Activo' | 'Inactivo';
  email: string;
  creationDate: string; // ISO date string
  lastActive: string; // ISO time string
  photoUrl: string;
}

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      fullName: 'Juan Pérez',
      status: 'Activo',
      email: 'juan.perez@example.com',
      creationDate: '2023-01-15',
      lastActive: '14:30',
      photoUrl: 'assets/perfil1.jpg'
    },
    {
      fullName: 'María Gómez',
      status: 'Inactivo',
      email: 'maria.gomez@example.com',
      creationDate: '2022-11-20',
      lastActive: '09:15',
      photoUrl: 'assets/perfil2.jpeg'
    },
    {
      fullName: 'Carlos López',
      status: 'Activo',
      email: 'carlos.lopez@example.com',
      creationDate: '2023-03-05',
      lastActive: '16:45',
      photoUrl: 'assets/perfil3.jpg'
    }
  ];

  filterName: string = '';
  filterStatus: string = '';
  filterEmail: string = '';
  filterCreationDate: string = '';
  filterLastActive: string = '';

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesName = user.fullName.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesStatus = this.filterStatus ? user.status === this.filterStatus : true;
      const matchesEmail = user.email.toLowerCase().includes(this.filterEmail.toLowerCase());
      const matchesCreationDate = this.filterCreationDate ? user.creationDate === this.filterCreationDate : true;
      const matchesLastActive = this.filterLastActive ? user.lastActive === this.filterLastActive : true;
      return matchesName && matchesStatus && matchesEmail && matchesCreationDate && matchesLastActive;
    });
  }

  selectedUser: User | null = null;

  selectUser(user: User) {
    this.selectedUser = user;
    console.log('Seleccionar usuario:', user);
    // TODO: Implement additional user selection logic
  }

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

  deleteUser(user: User) {
    console.log('Eliminar usuario:', user);
    // TODO: Implement user deletion logic
  }
}
