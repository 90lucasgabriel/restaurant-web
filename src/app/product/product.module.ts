import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }          from '@r-material/material.module';
import { CategoryModule }          from '@r-category/category.module';

import { ProductRoutingModule }    from '@r-product/product-routing.module';
import { ProductService }          from '@r-product/product.service';
import { ProductDao }              from '@r-product/product.dao';
import { ProductListComponent }    from '@r-product/product-list/product-list.component';
import { ProductDetailsComponent } from '@r-product/product-details/product-details.component';
import { ProductFormComponent }    from '@r-product/product-form/product-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  declarations: [ProductListComponent, ProductDetailsComponent, ProductFormComponent],
  providers:    [ProductService, ProductDao]
})
export class ProductModule {}
