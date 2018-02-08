import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { HttpClientModule }             from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }               from '@r-material/material.module';

import { OrderStatusRoutingModule }     from '@r-order-status/order-status-routing.module';
import { OrderStatusService }           from '@r-order-status/order-status.service';
import { OrderStatusDao }               from '@r-order-status/order-status.dao';
import { OrderStatusListComponent }     from '@r-order-status/order-status-list/order-status-list.component';
import { OrderStatusDetailsComponent }  from '@r-order-status/order-status-details/order-status-details.component';
import { OrderStatusFormComponent }     from '@r-order-status/order-status-form/order-status-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderStatusRoutingModule
  ],
  declarations: [OrderStatusListComponent, OrderStatusDetailsComponent, OrderStatusFormComponent],
  providers:    [OrderStatusService, OrderStatusDao]
})
export class OrderStatusModule {}
