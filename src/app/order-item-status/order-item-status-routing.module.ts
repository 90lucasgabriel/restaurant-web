import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

// import { OrderItemStatusListComponent }    from './order-item-status-list/order-item-status-list.component';
// import { OrderItemStatusFormComponent }    from './order-item-status-form/order-item-status-form.component';
// import { OrderItemStatusDetailsComponent } from './order-item-status-details/order-item-status-details.component';

const orderItemStatusRoutes: Routes = [
  /*{ path: 'company/:company_id/order-item-status/:id/edit',  component: OrderItemStatusFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/order-item-status/new',       component: OrderItemStatusFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/order-item-status/:id',       component: OrderItemStatusDetailsComponent,  pathMatch: 'full' },
  { path: 'company/:company_id/order-item-status',           component: OrderItemStatusListComponent,     pathMatch: 'full' }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(orderItemStatusRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderItemStatusRoutingModule {}
