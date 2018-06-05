import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { OrderItemListComponent }     from '@r-order-item/order-item-list/order-item-list.component';
// import { OrderItemFormComponent }     from '@r-order-item/order-item-form/order-item-form.component';
// import { OrderItemItemsComponent }  from '@r-order-item/order-item-items/order-item-items.component';

const orderItemRoutes: Routes = [

  { path: 'company/:company_id/branch/:branch_id/order-item',              component: OrderItemListComponent,        pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(orderItemRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderItemRoutingModule {}
