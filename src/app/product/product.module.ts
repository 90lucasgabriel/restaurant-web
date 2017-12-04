import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }          from '../material/material.module';
import { CategoryModule }          from '../category/category.module';

import { ProductRoutingModule }    from './product-routing.module';
import { ProductService }          from './product.service';
import { ProductDao }              from './product.dao';
import { ProductListComponent }    from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent }    from './product-form/product-form.component';

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
