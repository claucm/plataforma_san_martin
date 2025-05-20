import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  
  // Modelo para el formulario de nuevo usuario
  newUser: User = {
    first_name: '',
    lastname: '',
    email: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios: ' + (err.message || 'Error desconocido');
        this.loading = false;
        console.error('Error cargando usuarios:', err);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.create(this.newUser).subscribe({
      next: (response) => {
        // Agregar el nuevo usuario al array
        if (response.data) {
          this.users.push(response.data);
        }
        
        // Resetear el formulario
        this.newUser = {
          first_name: '',
          lastname: '',
          email: ''
        };
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al crear usuario: ' + (err.message || 'Error desconocido');
        this.loading = false;
        console.error('Error creando usuario:', err);
      }
    });
  }

  deleteUser(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.loading = true;
      
      this.userService.delete(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al eliminar usuario: ' + (err.message || 'Error desconocido');
          this.loading = false;
          console.error('Error eliminando usuario:', err);
        }
      });
    }
  }
}
