import { Component, OnInit } from '@angular/core';
import { NotificacionesService, Notification } from './notificaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Notificaciones</h2>
    <div>
      <label for="email">Correo Electrónico:</label>
      <input id="email" type="email" [(ngModel)]="email" placeholder="usuario@ejemplo.com" />
    </div>
    <div>
      <label for="subject">Asunto:</label>
      <input id="subject" type="text" [(ngModel)]="subject" placeholder="Asunto del correo" />
    </div>
    <div>
      <label for="message">Mensaje:</label>
      <textarea id="message" [(ngModel)]="message" placeholder="Mensaje de la notificación"></textarea>
    </div>
    <button (click)="sendEmail()">Enviar Correo</button>
    <hr />
    <div>
      <label for="userId">ID de Usuario (Plataforma):</label>
      <input id="userId" type="text" [(ngModel)]="userId" placeholder="ID de usuario" />
    </div>
    <div>
      <label for="platformMessage">Mensaje de Notificación:</label>
      <textarea id="platformMessage" [(ngModel)]="platformMessage" placeholder="Mensaje para la plataforma"></textarea>
    </div>
    <button (click)="sendPlatformNotification()">Enviar Notificación</button>
    <hr />
    <h3>Historial de Notificaciones</h3>
    <ul>
      <li *ngFor="let notification of notifications">
        <strong>{{ notification.type === 'email' ? 'Correo' : 'Plataforma' }}</strong> -
        <em>{{ notification.recipient }}</em> -
        <span *ngIf="notification.subject">Asunto: {{ notification.subject }} - </span>
        {{ notification.message }} -
        <small>{{ notification.date | date:'short' }}</small>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: transparent;
      border-radius: 8px;
      box-shadow: none;
      font-family: 'Montserrat', sans-serif;
    }
    h2 {
      color: #0a2e4c;
      margin-bottom: 20px;
      text-align: center;
    }
    div {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
    }
    input, textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
      color: #495057;
      background-color: transparent;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    input:focus, textarea:focus {
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
    button {
      display: block;
      width: 100%;
      padding: 10px 0;
      background-color: #0a2e4c;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #1f565a;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li {
      background: white;
      margin-bottom: 8px;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
export class NotificacionesComponent implements OnInit {
  email: string = '';
  subject: string = '';
  message: string = '';
  userId: string = '';
  platformMessage: string = '';
  notifications: Notification[] = [];

  constructor(private notificacionesService: NotificacionesService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = this.notificacionesService.getNotifications();
  }

  sendEmail(): void {
    if (this.email && this.subject && this.message) {
      this.notificacionesService.sendEmailNotification(this.email, this.subject, this.message);
      alert('Correo enviado.');
      this.loadNotifications();
      this.clearEmailForm();
    } else {
      alert('Por favor complete todos los campos para enviar el correo.');
    }
  }

  sendPlatformNotification(): void {
    if (this.userId && this.platformMessage) {
      this.notificacionesService.sendPlatformNotification(this.userId, this.platformMessage);
      alert('Notificación enviada.');
      this.loadNotifications();
      this.clearPlatformForm();
    } else {
      alert('Por favor complete todos los campos para enviar la notificación.');
    }
  }

  clearEmailForm(): void {
    this.email = '';
    this.subject = '';
    this.message = '';
  }

  clearPlatformForm(): void {
    this.userId = '';
    this.platformMessage = '';
  }
}
