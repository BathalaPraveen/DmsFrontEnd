import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-add.html',
  styleUrls: ['./product-add.css']
})
export class ProductAddComponent {

  darkMode = false; // optional: use theme context

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
    prod_status: '',
    prod_suppliers: '',
    prod_descriptions: '',
    prod_orig_image: '',
    prod_thumb_image: '',
  };

  errors: any = {};

  constructor(private router: Router, private http: HttpClient) {}
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
      prodDate: this.formData.prod_date,
      productId: this.formData.product_id
    };

    // Example: Get JWT token from localStorage
    const token = localStorage.getItem('token');

    this.http.post('http://localhost:8080/api/v1/products', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .subscribe({
      next: () => {
        alert("Product added successfully!");
        this.router.navigate(['/products/product-list']);
      },
      error: (err) => {
        console.error("ADD ERROR:", err);
        if (err.status === 401) alert("Unauthorized! Please login.");
        else alert("Failed to add product!");
      }
    });
  }



  handleCancel() {
    this.formData = {};
    this.errors = {};
  }
}
