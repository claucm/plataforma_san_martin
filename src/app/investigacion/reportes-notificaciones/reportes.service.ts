import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor() { }

  generatePDFReport(data: any[], columns: string[], title: string): void {
    const doc = new jsPDF();
    doc.text(title, 14, 16);
    autoTable(doc, {
      head: [columns],
      body: data.map(row => columns.map(col => row[col])),
      startY: 20,
    });
    doc.save(`${title}.pdf`);
  }

  generateExcelReport(data: any[], columns: string[], title: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  }
}
