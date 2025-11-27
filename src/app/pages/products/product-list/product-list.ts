import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/api/v1/products').subscribe({
      next: (data) => {
        this.products = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("API ERROR:", err);
      }
    });
  }

  get totalItems(): number {
    return this.products.length;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(start, start + this.itemsPerPage);
  }

  deleteProduct(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.http.delete(`http://localhost:8080/api/v1/products/${id}`).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("DELETE ERROR:", err);
      }
    });
  }
}
