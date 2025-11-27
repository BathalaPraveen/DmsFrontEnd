import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // required for ngModel
import { Router } from '@angular/router'; // <-- import Router
import { DepartmentService, Department, PaginatedDepartments } from '../../services/department.service';
import { ExportService } from '../../services/export.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.html',
  styleUrls: ['./department.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(
    private service: DepartmentService,
    private cdr: ChangeDetectorRef,
    private router: Router, // <-- inject Router
    private exportService: ExportService
  ) {}

  ngOnInit() {
    this.loadDepartments(this.currentPage);
  }

  loadDepartments(page: number) {
    this.service.getAllDepartments(page).subscribe({
      next: (res: PaginatedDepartments) => {
        this.departments = res.projects;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.totalItems = res.totalProjects;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  viewDepartment(id: number) {
   this.router.navigate(['/department/view', id]);
   }

 editDepartment(id: number) {
   this.router.navigate(['/department/edit', id]);
 }

  // department.ts (inside DepartmentComponent)

  deleteDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDepartment(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Department deleted successfully!',
              timer: 1500,
              showConfirmButton: false
            });
            this.loadDepartments(this.currentPage);
          },
          error: (err) => {
            console.error('Error deleting:', err);
            Swal.fire({
              icon: 'error',
              title: 'Failed!',
              text: 'Failed to delete department!',
            });
          }
        });
      }
    });
  }

   downloadExcel() {
      if (this.departments.length === 0) {
        alert("No data available to export");
        return;
      }
      this.exportService.exportToExcel(this.departments, 'Department_Report');
    }

    downloadPDF() {
      if (this.departments.length === 0) {
        alert("No data available to export");
        return;
      }
      this.exportService.exportToPDF(this.departments, 'Department_Report');
    }


  // <-- updated function to navigate to Add Department page
  gotoAddDepartment() {
    this.router.navigate(['/department/add']);
  }

  updatePagination() {
    this.loadDepartments(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) this.loadDepartments(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.loadDepartments(this.currentPage + 1);
  }

  gotoDashboard() {
    console.log('Navigate to dashboard');
    // implement navigation logic
  }

}
