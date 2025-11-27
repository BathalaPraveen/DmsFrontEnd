import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService, Department } from '../../services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.html',
  styleUrls: ['./add-department.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddDepartmentComponent implements OnInit {

  department: Department = {
    id: 0,
    department: '',
    district: '',
    emailId: '',
    name: '',
    position: '',
    state: '',
    detailsId: 0
  };

  states: any[] = [];
  districts: any[] = [];

  constructor(public router: Router, private service: DepartmentService) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates() {
    this.service.getStates().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.states = res;
          console.log('States loaded:', this.states);
        });
      },
      error: (err) => {
        console.error('Failed to load states', err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load states',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onStateChange(stateName: string) {
    this.service.getDistrictsByState(stateName).subscribe({
      next: (res) => this.districts = res,
      error: (err) => console.error('Error loading districts:', err)
    });
  }

  saveDepartment(form: NgForm) {
    if (!form.valid) {
      // SweetAlert for invalid form
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error!',
        text: 'Please fill all required fields correctly before saving.',
        confirmButtonColor: '#f0ad4e',
        confirmButtonText: 'OK'
      });
      return;
    }

    const payload = {
      department: this.department.department,
      district: this.department.district,
      name: this.department.name,
      position: this.department.position,
      state: this.department.state,
      emailID: this.department.emailId, // must match backend
      Details: {
        id: this.department.detailsId
      }
    };

    this.service.createDepartment(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Department saved successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/department/list']);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to save department!',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/department/list']);
  }
   goBackToDepartment(){
      this.router.navigate(['/department/list']);
     }
}
