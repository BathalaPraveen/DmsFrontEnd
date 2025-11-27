import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() {}

  // EXCEL EXPORT
  exportToExcel(data: any[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }

  // PDF EXPORT
  exportToPDF(data: any[], fileName: string) {
    const doc = new jsPDF();
    const headers = Object.keys(data[0]);

    const rows = data.map(obj => headers.map(h => obj[h]));

    autoTable(doc, {
      head: [headers],
      body: rows
    });

    doc.save(fileName + '.pdf');
  }
}
