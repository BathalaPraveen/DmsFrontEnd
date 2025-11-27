import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService, Department } from '../../services/department.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.html',
  styleUrls: ['./view-department.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ViewDepartmentComponent implements OnInit {
  departmentId!: number;
  departmentData!: Department;

  constructor(private route: ActivatedRoute, private service: DepartmentService) {}

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Department ID:', this.departmentId); // <-- check this
    this.loadDepartment();
  }

  loadDepartment() {
    this.service.getDepartmentById(this.departmentId).subscribe((res: any) => {
      console.log('Department data from API:', res); // <-- check this
      this.departmentData = {
        id: res.id,
        department: res.department,
        state: res.state,
        district: res.district,
        name: res.name,
        position: res.position,
        emailId: res.emailID, // map backend field to interface
        detailsId: res.detailsId
      };
    });
  }

  goBack() {
    history.back();
  }
}
