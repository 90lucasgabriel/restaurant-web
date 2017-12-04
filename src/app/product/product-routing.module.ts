import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ProductListComponent }    from './product-list/product-list.component';
import { ProductFormComponent }    from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const productRoutes: Routes = [
  { path: 'company/:company_id/product/:id/edit',  component: ProductFormComponent },
  { path: 'company/:company_id/product/new',       component: ProductFormComponent },
  { path: 'company/:company_id/product/:id',       component: ProductDetailsComponent },
  { path: 'company/:company_id/product',           component: ProductListComponent }
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
