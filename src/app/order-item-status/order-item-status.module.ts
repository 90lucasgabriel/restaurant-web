import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }         from '@r-material/material.module';

import { OrderItemStatusRoutingModule }    from '@r-order-item-status/order-item-status-routing.module';
import { OrderItemStatusService }          from '@r-order-item-status/order-item-status.service';
import { OrderItemStatusDao }              from '@r-order-item-status/order-item-status.dao';
// import { OrderItemStatusListComponent }    from '@r-order-item-status/order-item-status-list/order-item-status-list.component';
// import { OrderItemStatusDetailsComponent } from '@r-order-item-status/order-item-status-details/order-item-status-details.component';
// import { OrderItemStatusFormComponent }    from '@r-order-item-status/order-item-status-form/order-item-status-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderItemStatusRoutingModule
  ],
  declarations: [/*OrderItemStatusListComponent, OrderItemStatusDetailsComponent, OrderItemStatusFormComponent*/],
  providers:    [OrderItemStatusService, OrderItemStatusDao]
})
export class OrderItemStatusModule {}
