import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, PaginationComponent],
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {

  holidays: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private http: HttpClient,private cd: ChangeDetectorRef)  {}

  ngOnInit() {
    this.loadHolidays();
  }

 loadHolidays() {
        this.http.get<any[]>('http://localhost:8080/api/v1/holidays').subscribe({
           next: data => {
//              console.log("API Response:", data);  // check console
             this.holidays = data;
             const maxPage = Math.ceil(this.holidays.length / this.itemsPerPage);
                   if (this.currentPage > maxPage) {
                     this.currentPage = maxPage || 1; // fallback to 1 if no data
                   }
              this.cd.detectChanges();
           },
           error: err => {
             console.error("ERROR:", err);  // shows if CORS blocking
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
     }).then((result) => {
       if (result.isConfirmed) {
         this.http.delete(`http://localhost:8080/api/v1/holidays/${id}`)
           .subscribe({
             next: () => {
               Swal.fire(
                 'Deleted!',
                 'Holiday has been deleted.',
                 'success'
               );
               this.loadHolidays(); // reload table
               this.cd.detectChanges();
             },
             error: (err: any) => {   // specify type for TS
               console.error("Delete ERROR:", err);
               Swal.fire(
                 'Error!',
                 'Failed to delete holiday.',
                 'error'
               );
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

