import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEditComponent implements OnInit {

  darkMode = false;
  productId!: number;

  errors: any = {};

  formData: any = {
    prodManufacturerId: { id: null },
    prodUom: { id: null },
    prodName: '',
    prodCategory: '',
    prodSubcategory: '',
    prodModelNo: '',
    prodBuyPrice: null,
    prodBprice: null,
    prodCfee: null,
    prodHfee: null,
    prodIfee: null,
    prodMfee: null,
    prodLength: '',
    prodWidth: '',
    prodDate: '',
    prodStatus: '',
    prodDescriptions: '',
    prodSuppliers: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct(this.productId);
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data: any) => {
        this.formData = {
          prodManufacturerId: data.prodManufacturerId || { id: 0 },
          prodUom: data.prodUom || { id: 0 },
          prodName: data.prodName || '',
          prodCategory: data.prodCategory || '',
          prodSubcategory: data.prodSubcategory || '',
          prodModelNo: data.prodModelNo || '',
          prodBuyPrice: data.prodBuyPrice || null,
          prodBprice: data.prodBprice || null,
          prodCfee: data.prodCfee || null,
          prodHfee: data.prodHfee || null,
          prodIfee: data.prodIfee || null,
          prodMfee: data.prodMfee || null,
          prodLength: data.prodLength || '',
          prodWidth: data.prodWidth || '',
          prodDate: data.prodDate || '',
          prodStatus: data.prodStatus || '',
          prodDescriptions: data.prodDescriptions || '',
          prodSuppliers: data.prodSuppliers || '',
        };

        this.cd.detectChanges();
      },
      error: err => console.error("Load Error:", err)
    });
  }

  validate() {
    const e: any = {};

    if (!this.formData.prodName) e.prodName = "Product name is required";
    if (!this.formData.prodCategory) e.prodCategory = "Category is required";
    if (!this.formData.prodDate) e.prodDate = "Date is required";
    if (!this.formData.prodBuyPrice) e.prodBuyPrice = "Buy price is required";

    this.errors = e;
    return Object.keys(e).length === 0;
  }

  handleSave() {
    if (!this.validate()) return;

    this.productService.updateProduct(this.productId, this.formData).subscribe({
      next: () => {
        Swal.fire({
                  icon: 'success',
                  title: 'Product Updated',
                  text: 'Product updated successfully!',
                  confirmButtonColor: '#3085d6'
                }).then(() => {
                  this.router.navigate(['/products/product-list']);
                });
      },
      error: (err) => {
       console.error("API ERROR:", err);
               Swal.fire({
                 icon: 'error',
                 title: 'Update Failed',
                 text: err.error?.message || 'Unable to update the product!',
                 confirmButtonColor: '#d33'
               });
               this.errors.api = err.error?.message;
               this.cd.detectChanges();
             }
       });
  }

  handleCancel() {
    this.router.navigate(['/products/product-list']);
  }
}
