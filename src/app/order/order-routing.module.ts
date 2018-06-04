import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { OrderListComponent }     from '@r-order/order-list/order-list.component';
import { OrderFormComponent }     from '@r-order/order-form/order-form.component';
import { OrderDetailsComponent }  from '@r-order/order-details/order-details.component';

const orderRoutes: Routes = [
  { path: 'company/:company_id/branch/:branch_id/order/:id/edit',  component: OrderFormComponent,        pathMatch: 'full'},
  { path: 'company/:company_id/branch/:branch_id/order/new',       component: OrderFormComponent,        pathMatch: 'full' },
  { path: 'company/:company_id/branch/:branch_id/order/:id',       component: OrderDetailsComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/branch/:branch_id/order',               component: OrderListComponent,        pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {}
