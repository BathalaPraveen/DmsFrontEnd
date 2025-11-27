import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './holiday-edit.html',
  styleUrls: ['./holiday-edit.css']
})
export class HolidayEditComponent implements OnInit {

  id!: number;
  darkMode = false;

  stateOptions: string[] = [
    "Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang",
    "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor",
    "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"
  ];

  formData = {
    state: "",
    holidayDate: "",
    holidayInfo: ""
  };

  errors: any = {};
  originalData: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHoliday();
  }

  // Convert backend format "27-01-2025" → HTML date input "2025-01-27"
  convertToInputDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  }

  loadHoliday() {
    this.http.get<any>(`http://localhost:8080/api/v1/holidays/${this.id}`)
      .subscribe({
        next: (res) => {
          setTimeout(() => {
            this.formData.state = res.state;
            this.formData.holidayDate = this.convertToInputDate(res.date);
            this.formData.holidayInfo = res.informations;
            this.originalData = { ...this.formData };
            this.cd.detectChanges();
          }, 0);
        },
        error: () => {
          Swal.fire("Error", "Unable to load holiday!", "error");
        }
      });
  }
  resetToOriginal() {
    this.formData = { ...this.originalData };
  }

  validate() {
    const e: any = {};

    if (!this.formData.state) e.state = "State is required";
    if (!this.formData.holidayDate) e.holidayDate = "Date is required";
    if (!this.formData.holidayInfo || this.formData.holidayInfo.trim().length < 3)
      e.holidayInfo = "Holiday info is required";

    this.errors = e;
    return Object.keys(e).length === 0;
  }

  // Convert HTML date "2025-01-27" → backend format "27-01-2025"
  formatDateToDDMMYYYY(dateStr: string): string {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  handleUpdate() {
    if (!this.validate()) return;

    const payload = {
      state: this.formData.state,
      date: this.formatDateToDDMMYYYY(this.formData.holidayDate),
      informations: this.formData.holidayInfo
    };

    this.http.put(`http://localhost:8080/api/v1/holidays/${this.id}`, payload)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Holiday updated successfully.',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/holiday/holiday-list']);
          });
        },
        error: () => {
          Swal.fire('Error', 'Failed to update holiday', 'error');
        }
      });
  }
}
