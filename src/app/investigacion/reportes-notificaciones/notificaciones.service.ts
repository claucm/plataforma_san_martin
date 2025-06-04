import { Injectable } from '@angular/core';

export interface Notification {
  id: number;
  type: 'email' | 'platform';
  recipient: string;
  subject?: string;
  message: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notifications: Notification[] = [];
  private nextId = 1;

  constructor() { }

  sendEmailNotification(email: string, subject: string, message: string): void {
    // TODO: Implement email sending logic, possibly via backend API
    console.log(`Sending email to ${email} with subject "${subject}" and message: ${message}`);
    this.addNotification({
      id: this.nextId++,
      type: 'email',
      recipient: email,
      subject,
      message,
      date: new Date()
    });
  }

  sendPlatformNotification(userId: string, message: string): void {
    // TODO: Implement platform notification logic, e.g., push notification or in-app alert
    console.log(`Sending platform notification to user ${userId}: ${message}`);
    this.addNotification({
      id: this.nextId++,
      type: 'platform',
      recipient: userId,
      message,
      date: new Date()
    });
  }

  getNotifications(): Notification[] {
    return this.notifications.slice().reverse();
  }

  private addNotification(notification: Notification): void {
    this.notifications.push(notification);
  }
}
