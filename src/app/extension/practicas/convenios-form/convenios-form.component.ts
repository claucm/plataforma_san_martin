import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-convenios-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './convenios-form.component.html',
  styleUrls: ['./convenios-form.component.css']
})
export class ConveniosFormComponent {
  selectedNivel: string = 'Pregrado';

  programasPregrado = [
    'Administración de Empresas',
    'Contaduría Pública',
    'Derecho',
    'Medicina Bogotá',
    'Medicina Cali',
    'Medicina Pasto',
    'Medicina Puerto Colombia',
    'Medicina Sabaneta',
    'Medicina Veterinaria y Zootecnia – Bogotá',
    'Medicina Veterinaria y Zootecnia – Cali',
    'Medicina Veterinaria y Zootecnia – Puerto Colombia',
    'Negocios Internacionales',
    'Nutrición y Dietética',
    'Odontología Bogotá',
    'Odontología Puerto Colombia',
    'Optometría',
    'Psicología',
    'Publicidad y Mercadeo'
  ];

  programasPosgrado = [
    'Especialización de Cirugía en Tejidos Blandos de Pequeños Animales',
    'Especialización en Medicina de Fauna Silvestre',
    'Especialización en Medicina Interna',
    'Especialización en Producción Animal'
  ];

  onNivelChange(event: any) {
    this.selectedNivel = event.target.value;
  }
}