import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // GET product by ID (optional for edit page)
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // ADD product
  addProduct(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // UPDATE product
  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // DELETE product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
