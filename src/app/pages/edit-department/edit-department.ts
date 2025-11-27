import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService, Department } from '../../services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.html',
  styleUrls: ['./edit-department.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditDepartmentComponent implements OnInit {

  departmentId!: number;
  states: any[] = [];
  districts: any[] = [];

  departmentData: Department = {
    id: 0,
    department: '',
    district: '',
    emailId: '',
    name: '',
    position: '',
    state: '',
    detailsId: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStates();
    this.loadDepartment();
  }

  // Load states
  loadStates() {
    this.departmentService.getStates().subscribe({
      next: (res: any) => (this.states = res),
      error: (err) => console.error('Error loading states:', err)
    });
  }

  // Load department details
  loadDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe({
      next: (res: any) => {

        this.departmentData = {
          id: res.id,
          department: res.department,
          state: res.state,
          district: res.district,
          name: res.name,
          position: res.position,
          emailId: res.emailID,    // <-- backend → frontend mapping
          detailsId: res.Details ? res.Details.id : 0
        };

        if (this.departmentData.state) {
          this.onStateChange(this.departmentData.state);
        }
      },
      error: (err) => console.error('Error loading department:', err)
    });
  }

  // Load districts on state change
  onStateChange(stateName: string) {
    this.departmentService.getDistrictsByState(stateName).subscribe({
      next: (res: any) => (this.districts = res),
      error: (err) => console.error('Error loading districts:', err)
    });
  }

  // Update department
// Update department
updateDepartment() {
  const payload: Department = {
    id: this.departmentData.id,
    department: this.departmentData.department,
    district: this.departmentData.district,
    name: this.departmentData.name,
    position: this.departmentData.position,
    state: this.departmentData.state,
    emailId: this.departmentData.emailId,    // top-level
    detailsId: this.departmentData.detailsId
  };

  this.departmentService.updateDepartment(this.departmentId, payload).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Department updated successfully!',
        confirmButtonColor: '#3085d6'
      }).then(() => this.router.navigate(['/department/list']));
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to update department!',
        confirmButtonColor: '#d33'
      });
    }
  });
}

  goBackToDepartment() {
    this.router.navigate(['/department/list']);
  }
gotoDashboard() {
  this.router.navigate(['/dashboard']);
}
}
