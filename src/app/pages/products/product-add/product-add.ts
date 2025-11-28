import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-add.html',
  styleUrls: ['./product-add.css']
})
export class ProductAddComponent {

  darkMode = false;

  formData: any = {
    prod_id: '',
    prod_name: '',
    prod_category: '',
    prod_subcategory: '',
    prod_model_no: '',
    prod_manufacturer_idIndex: '',
    prod_uom_idIndex: '',
    prod_bprice: '',
    prod_buy_price: '',
    prod_cfee: '',
    prod_hfee: '',
    prod_ifee: '',
    prod_mfee: '',
    prod_length: '',
    prod_width: '',
    prod_date: '',
    prod_status: 'In-progress',
    prod_suppliers: '',
    prod_descriptions: '',
    prod_orig_image: '',
    prod_thumb_image: '',
  };

  errors: any = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}

  clearError(field: string) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  validate() {
    const e: any = {};

    if (!this.formData.prod_id || !/^[0-9]+$/.test(this.formData.prod_id))
      e.prod_id = "Product ID is required and must be numeric";

    if (!this.formData.prod_name || this.formData.prod_name.trim().length < 2)
      e.prod_name = "Product name is required";

    if (!this.formData.prod_category)
      e.prod_category = "Category is required";

    if (!this.formData.prod_date)
      e.prod_date = "Date is required";

    if (!this.formData.prod_buy_price)
      e.prod_buy_price = "Buy price is required";

    this.errors = e;
    return Object.keys(e).length === 0;
  }

  handleSave() {
    if (!this.validate()) return;

    const payload = {
      prodId: this.formData.prod_id,
      prodName: this.formData.prod_name,
      prodDescriptions: this.formData.prod_descriptions,
      prodBprice: Number(this.formData.prod_bprice),
      prodHfee: Number(this.formData.prod_hfee),
      prodCfee: Number(this.formData.prod_cfee),
      prodIfee: Number(this.formData.prod_ifee),
      prodMfee: Number(this.formData.prod_mfee),
      prodBuyPrice: Number(this.formData.prod_buy_price),
      prodOrigImage: this.formData.prod_orig_image,
      prodThumbImage: this.formData.prod_thumb_image,
      prodCategory: this.formData.prod_category,
      prodSubcategory: this.formData.prod_subcategory,
      prodUom: { id: this.formData.prod_uom_idIndex },
      prodManufacturerId: { id: this.formData.prod_manufacturer_idIndex },
      prodLength: this.formData.prod_length,
      prodWidth: this.formData.prod_width,
      prodModelNo: this.formData.prod_model_no,
      prodSuppliers: this.formData.prod_suppliers,
      prodStatus: this.formData.prod_status,
      prodDate: this.formData.prod_date
    };

    this.productService.addProduct(payload).subscribe({
      next: () => {
        Swal.fire({
                  icon: 'success',
                  title: 'Product Added',
                  text: 'Product added successfully!',
                  confirmButtonColor: '#3085d6'
                }).then(() => {
                  this.router.navigate(['/products/product-list']);
                });
      },
      error: (err) => {
        console.error("ADD ERROR:", err);

                const errorMessage = err.error?.message || "Failed to add product!";
                Swal.fire({
                  icon: 'error',
                  title: 'Add Failed',
                  text: errorMessage,
                  confirmButtonColor: '#d33'
                });

                this.errors.api = errorMessage;
                this.cd.detectChanges();
              }
            });
  }

  handleCancel() {
    this.formData = {};
    this.errors = {};
  }
}
