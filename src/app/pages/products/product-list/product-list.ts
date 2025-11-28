import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ExportService } from '../../../services/export.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { ProductService } from '../../../core/services/product.service';
import Swal from 'sweetalert2';


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

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private exportService: ExportService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  downloadExcel() {
    if (this.products.length === 0) {
      alert("No data available to export");
      return;
    }
    this.exportService.exportToExcel(this.products, 'Product_Report');
  }

  downloadPDF() {
    if (this.products.length === 0) {
      alert("No data available to export");
      return;
    }

    const flatProducts = this.products.map(p => ({
      ...p,
      prodManufacturerId: p.prodManufacturerId?.id ?? '',
      prodUom: p.prodUom?.id ?? ''
    }));

    this.exportService.exportToPDF(flatProducts, 'Products_Report');
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
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
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== id);
              this.cd.detectChanges();

              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Product has been deleted.',
                confirmButtonColor: '#3085d6'
              });
            },
            error: (err) => {
              console.error("DELETE ERROR:", err);
              Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Unable to delete product.',
                confirmButtonColor: '#d33'
              });
            }
          });
        }
      });
  }
}
