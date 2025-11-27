import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private API_URL = 'http://localhost:8084/api/departments';

  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  getDepartmentById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createDepartment(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, data);
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
