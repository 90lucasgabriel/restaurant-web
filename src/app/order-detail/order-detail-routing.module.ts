import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { OrderDetailListComponent }     from '@r-order-detail/order-detail-list/order-detail-list.component';
// import { OrderDetailFormComponent }     from '@r-order-detail/order-detail-form/order-detail-form.component';
// import { OrderDetailDetailsComponent }  from '@r-order-detail/order-detail-details/order-detail-details.component';

const orderDetailRoutes: Routes = [

  { path: 'company/:company_id/branch/:branch_id/order-detail',              component: OrderDetailListComponent,        pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(orderDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderDetailRoutingModule {}
