import { Component } from '@angular/core';
import { ReportesService } from './reportes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generacion-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Generación de Reportes</h2>
    <div>
      <label for="reportType">Tipo de Reporte:</label>
      <select id="reportType" [(ngModel)]="reportType">
        <option value="investigacion">Investigación</option>
        <option value="extension">Extensión</option>
        <option value="proyectos">Proyectos</option>
      </select>
    </div>
    <div>
      <label for="format">Formato:</label>
      <select id="format" [(ngModel)]="format">
        <option value="pdf">PDF</option>
        <option value="excel">Excel</option>
      </select>
    </div>
    <button (click)="generateReport()">Generar Reporte</button>
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
      font-family: Arial, sans-serif;
    }
    h2 {
      color: #0a2e4c;
      margin-bottom: 20px;
      text-align: center;
    }
    div {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    label {
      flex: 0 0 150px;
      font-weight: 600;
      color: #333;
    }
    select {
      flex: 1;
      padding: 6px 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
      color: #495057;
      background-color: transparent;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    select:focus {
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(42,114,124,.25);
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
  `]
})
export class GeneracionReportesComponent {
  reportType: string = 'investigacion';
  format: string = 'pdf';

  constructor(private reportesService: ReportesService) {}

  generateReport(): void {
    // Mock data for demonstration
    const data = [
      { Nombre: 'Proyecto A', Estado: 'Activo', Fecha: '2023-01-01' },
      { Nombre: 'Proyecto B', Estado: 'Finalizado', Fecha: '2022-12-15' }
    ];
    const columns = ['Nombre', 'Estado', 'Fecha'];
    const title = `Reporte de ${this.reportType}`;

    if (this.format === 'pdf') {
      this.reportesService.generatePDFReport(data, columns, title);
    } else if (this.format === 'excel') {
      this.reportesService.generateExcelReport(data, columns, title);
    }
  }
}
