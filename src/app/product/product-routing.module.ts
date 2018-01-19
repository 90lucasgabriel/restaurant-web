import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ProductListComponent }    from '@r-product/product-list/product-list.component';
import { ProductFormComponent }    from '@r-product/product-form/product-form.component';
import { ProductDetailsComponent } from '@r-product/product-details/product-details.component';

const productRoutes: Routes = [
  { path: 'company/:company_id/product/:id/edit',  component: ProductFormComponent,     pathMatch: 'full'},
  { path: 'company/:company_id/product/new',       component: ProductFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/product/:id',       component: ProductDetailsComponent,  pathMatch: 'full' },
  { path: 'company/:company_id/product',           component: ProductListComponent,     pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule {}
