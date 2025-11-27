import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faFileExcel, faFilePdf, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.html',
  styleUrls: ['./employee.css'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Employee implements OnInit {

  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;
  faPlus = faPlus;

  employees: any[] = [];   // employee array

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // later will call API
  }

  gotoAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

  // Pagination
  get totalItems(): number {
    return this.employees.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  updatePagination() {
    this.currentPage = 1;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  // Buttons
  downloadExcel() {
    alert("Excel download will be implemented later");
  }

  downloadPdf() {
    alert("PDF download will be implemented later");
  }

  editEmployee(row: any) {
    alert("Edit Employee ID: " + row.employeeId);
  }

  deleteEmployee(row: any) {
    if (confirm("Are you sure you want to delete " + row.employeeName + "?")) {
      this.employees = this.employees.filter(emp => emp.employeeId !== row.employeeId);
      this.updatePagination();
    }
  }

  isNoData(): boolean {
    return this.employees.length === 0;
  }
  gotoDashboard() {
    this.router.navigate(['/dashboard']);  // change path if needed
  }
}
