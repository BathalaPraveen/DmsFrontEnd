import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Holiday {
  id?: number;
  state: string;
  date: string;        // e.g. "DD-MM-YYYY"
  informations: string; // holiday description
}

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private baseUrl = 'http://localhost:8080/api/v1/holidays';

  constructor(private http: HttpClient) {}

  // GET all holidays
  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.baseUrl);
  }

  // GET holiday by ID
  getHolidayById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${this.baseUrl}/${id}`);
  }

  // ADD holiday
  addHoliday(data: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.baseUrl, data);
  }

  // UPDATE holiday
  updateHoliday(id: number, data: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(`${this.baseUrl}/${id}`, data);
  }

  // DELETE holiday
  deleteHoliday(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
