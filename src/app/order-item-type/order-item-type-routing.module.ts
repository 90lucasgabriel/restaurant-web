import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

// import { OrderItemTypeListComponent }    from './order-item-type-list/order-item-type-list.component';
// import { OrderItemTypeFormComponent }    from './order-item-type-form/order-item-type-form.component';
// import { OrderItemTypeDetailsComponent } from './order-item-type-details/order-item-type-details.component';

const orderItemTypeRoutes: Routes = [
  /*{ path: 'company/:company_id/order-item-type/:id/edit',  component: OrderItemTypeFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/order-item-type/new',       component: OrderItemTypeFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/order-item-type/:id',       component: OrderItemTypeDetailsComponent,  pathMatch: 'full' },
  { path: 'company/:company_id/order-item-type',           component: OrderItemTypeListComponent,     pathMatch: 'full' }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(orderItemTypeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderItemTypeRoutingModule {}
