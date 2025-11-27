import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { STATES } from '../../../constants/states';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.css']
})
export class HolidayAddComponent {

  darkMode = false; // If you have theme context, replace dynamically
  constructor(private router: Router, private http: HttpClient) {}
  stateOptions = STATES;
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
      return `${day}-${month}-${year}`;   // dd-MM-yyyy
  }

  handleSave() {
    if (!this.validate()) return;


    const payload = {
      state: this.formData.state,
      date: this.formatDateToDDMMYYYY(this.formData.holidayDate),
      informations: this.formData.holidayInfo
    };

    console.log("Payload sending to API:", payload);

    this.http.post('http://localhost:8080/api/v1/holidays', payload)
      .subscribe({
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
        error: (err) => {
          console.error("API ERROR:", err);
          Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Failed to add holiday!',
                    confirmButtonColor: '#d33'
                  });
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
