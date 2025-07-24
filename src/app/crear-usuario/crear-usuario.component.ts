import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  constructor(private userService: UserService) {}

  crearUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formValues = form.value;
    const newUser: User = {
      first_name: formValues.nombre,
      lastname: '', // Adjust if lastname field is added
      email: formValues.email,
      phone: formValues.telefono,
      roles: formValues.rol ? [{ name: formValues.rol }] : []
    };

    this.userService.create(newUser).subscribe({
      next: (response) => {
        alert('Usuario creado exitosamente.');
        form.resetForm();
      },
      error: (error) => {
        alert('Error al crear usuario. Por favor, intente de nuevo.');
        console.error('Error al crear usuario:', error);
      }
    });
  }
}
