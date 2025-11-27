import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Department {
  id: number;
  department: string;
  district: string;
  name: string;
  position: string;
  state: string;
  emailId: string;
  detailsId: number;
  Details?: {
    id: number;
    emailID?: string;
  };
}



export interface PaginatedDepartments {
  totalProjects: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  projects: Department[];
}
export interface State {
  code: string;
  name: string;
}
export interface District {
  code: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'http://localhost:8084/api/v1/departments';

   private mockBase = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // Helper: get JWT headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // make sure this key is correct
    return new HttpHeaders({
      Authorization: `Bearer ${token ? token : ''}`
    });
  }

  getAllDepartments(page: number = 1, size: number = 10): Observable<PaginatedDepartments> {
    const headers = this.getAuthHeaders();
    return this.http.get<PaginatedDepartments>(`${this.baseUrl}?page=${page - 1}&size=${size}`, { headers });
  }

 getDepartmentById(id: number): Observable<Department> {
   const headers = this.getAuthHeaders();
   return this.http.get<Department>(`${this.baseUrl}/${id}`, { headers });
 }

  createDepartment(department: Partial<Department>): Observable<Department> {
    const token = localStorage.getItem('token');
    const headers = this.getAuthHeaders();
    return this.http.post<Department>(`${this.baseUrl}`, department, { headers });
  }
 updateDepartment(id: number, department: Department): Observable<Department> {
   const headers = this.getAuthHeaders();
   return this.http.put<Department>(`${this.baseUrl}/${id}`, department, { headers });
 }
  deleteDepartment(id: number) {
  const headers = this.getAuthHeaders();
  return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
  getStates(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/');
  }

     getDistrictsByState(stateCode: string): Observable<District[]> {
       return this.http.get<District[]>(`${this.mockBase}/states/${stateCode}/districts`);
     }

}
