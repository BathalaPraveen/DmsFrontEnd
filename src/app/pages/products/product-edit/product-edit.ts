import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEditComponent implements OnInit {
  darkMode = false;
  productId!: number;
  errors: any = {};
  formData: any = {
//     prodId :'',
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
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // get id from URL
      this.loadProduct(this.productId);
    });
  }

 loadProduct(id: number) {
   const token = localStorage.getItem('token');
   this.http.get(`http://localhost:8080/api/v1/products/${id}`, {
     headers: { Authorization: `Bearer ${token}` }
   }).subscribe({
     next: (data: any) => {
       // Ensure nested objects exist
//        this.formData.prodId = data.prodId || null;
       this.formData.prodManufacturerId = data.prodManufacturerId || { id: 0 };
       this.formData.prodUom = data.prodUom || { id: 0 };

       // Map all other properties
       this.formData.prodName = data.prodName || '';
       this.formData.prodCategory = data.prodCategory || '';
       this.formData.prodSubcategory = data.prodSubcategory || '';
       this.formData.prodModelNo = data.prodModelNo || '';
       this.formData.prodBuyPrice = data.prodBuyPrice || null;
       this.formData.prodBprice = data.prodBprice || null;
       this.formData.prodCfee = data.prodCfee || null;
       this.formData.prodHfee = data.prodHfee || null;
       this.formData.prodIfee = data.prodIfee || null;
       this.formData.prodMfee = data.prodMfee || null;
       this.formData.prodLength = data.prodLength || '';
       this.formData.prodWidth = data.prodWidth || '';
       this.formData.prodDate = data.prodDate || '';
       this.formData.prodStatus = data.prodStatus || '';
       this.formData.prodDescriptions = data.prodDescriptions || '';
       this.formData.prodSuppliers = data.prodSuppliers || '';
//        this.formData.productId = data.productId || '';

       this.cd.detectChanges();
     },
     error: (err) => console.error("Failed to load product", err)
   });
 }



  validate() {
    const e: any = {};
    if (!this.formData.prodName || this.formData.prodName.trim().length < 2)
      e.prodName = "Product name is required";
    if (!this.formData.prodCategory)
      e.prodCategory = "Category is required";
    if (!this.formData.prodDate)
      e.prodDate = "Date is required";
    if (!this.formData.prodBuyPrice)
      e.prodBuyPrice = "Buy price is required";

    this.errors = e;
    return Object.keys(e).length === 0;
  }

 handleSave() {
   if (!this.validate()) return;

   const token = localStorage.getItem('token');
   this.http.put(`http://localhost:8080/api/v1/products/${this.productId}`, this.formData, {
     headers: { Authorization: `Bearer ${token}` }
   }).subscribe({
     next: () => {
       alert("Product updated successfully!");
       this.router.navigate(['/products/product-list']); // 🔥 Redirect here
     },
     error: (err) => {
       if (err.status === 401) {
         alert("Unauthorized! Please login.");
         this.router.navigate(['/login']);
       } else {
         alert("Failed to update product!");
       }
     }
   });
 }

  handleCancel() {
    this.router.navigate(['/products/product-list']);
  }
}
