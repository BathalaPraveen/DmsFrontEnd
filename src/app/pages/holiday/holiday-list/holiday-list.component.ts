import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { ExportService } from '../../../services/export.service';
import { HolidayService } from '../../../core/services/holiday.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationComponent],
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {

  holidays: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private holidayService: HolidayService,
    private cd: ChangeDetectorRef,
    private exportService: ExportService
  ) {}   //  FIXED — removed extra {}

  ngOnInit() {
    this.loadHolidays();
  }

  downloadExcel() {
    if (this.holidays.length === 0) {
      alert("No data available to export");
      return;
    }
    this.exportService.exportToExcel(this.holidays, 'Holiday_Report');
  }

  downloadPDF() {
    if (this.holidays.length === 0) {
      alert("No data available to export");
      return;
    }
    this.exportService.exportToPDF(this.holidays, 'Holiday_Report');
  }

  loadHolidays() {
    this.holidayService.getHolidays().subscribe({
      next: data => {
        this.holidays = data;

        const maxPage = Math.ceil(this.holidays.length / this.itemsPerPage);
        if (this.currentPage > maxPage) {
          this.currentPage = maxPage || 1;
        }

        this.cd.detectChanges();
      },
      error: err => {
        console.error("ERROR:", err);
      }
    });
  }

  deleteHoliday(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {

        this.holidayService.deleteHoliday(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Holiday has been deleted.', 'success');
            this.loadHolidays();
            this.cd.detectChanges();
          },
          error: err => {
            console.error("Delete ERROR:", err);
            Swal.fire('Error!', 'Failed to delete holiday.', 'error');
          }
        });

      }
    });
  }

  get totalItems(): number {
    return this.holidays.length;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.holidays.slice(start, start + this.itemsPerPage);
  }
}
