import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { STATES } from '../../../constants/states';
import Swal from 'sweetalert2';
import { HolidayService } from '../../../core/services/holiday.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-holiday-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.css']
})
export class HolidayAddComponent {

  darkMode = false;
//   stateOptions = STATES;
  stateOptions: string[] = [
      "Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang",
      "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor",
      "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"
    ];

  constructor(
    private router: Router,
    private holidayService: HolidayService,
    private cd: ChangeDetectorRef
  ) {}

  formData = {
    state: "",
    holidayDate: "",
    holidayInfo: ""
  };

  errors: any = {};

  clearError(field: string) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
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

  formatDateToDDMMYYYY(dateStr: string): string {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  handleSave() {
    if (!this.validate()) return;

    const payload = {
      state: this.formData.state,
      date: this.formatDateToDDMMYYYY(this.formData.holidayDate),
      informations: this.formData.holidayInfo
    };

    console.log("Payload sending to API:", payload);

    this.holidayService.addHoliday(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Holiday Added',
          text: 'Holiday added successfully!',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/holiday/holiday-list']);
        });
      },
      error: (err: any) => {
        console.error("API ERROR:", err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to add holiday!',
          confirmButtonColor: '#d33'
        });
      this.cd.detectChanges();
      }
    });
  }

  handleCancel() {
    this.formData = {
      state: "",
      holidayDate: "",
      holidayInfo: ""
    };
    this.errors = {};
  }
}
