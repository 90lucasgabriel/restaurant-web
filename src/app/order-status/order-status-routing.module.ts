import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { OrderStatusListComponent }    from '@r-order-status/order-status-list/order-status-list.component';
import { OrderStatusFormComponent }    from '@r-order-status/order-status-form/order-status-form.component';
import { OrderStatusDetailsComponent } from '@r-order-status/order-status-details/order-status-details.component';

const productRoutes: Routes = [
  { path: 'order-status/:id/edit',  component: OrderStatusFormComponent,     pathMatch: 'full'},
  { path: 'order-status/new',       component: OrderStatusFormComponent,     pathMatch: 'full' },
  { path: 'order-status/:id',       component: OrderStatusDetailsComponent,  pathMatch: 'full' },
  { path: 'order-status',           component: OrderStatusListComponent,     pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderStatusRoutingModule {}
