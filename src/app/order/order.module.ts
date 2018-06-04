import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }          from '@r-material/material.module';
import { CategoryModule }          from '@r-category/category.module';

import { OrderRoutingModule }      from '@r-order/order-routing.module';
import { OrderService }            from '@r-order/order.service';
import { OrderDao }                from '@r-order/order.dao';
import { OrderListComponent }      from '@r-order/order-list/order-list.component';
import { OrderDetailsComponent }   from '@r-order/order-details/order-details.component';
import { OrderFormComponent }      from '@r-order/order-form/order-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  declarations: [OrderListComponent, OrderDetailsComponent, OrderFormComponent],
  providers:    [OrderService, OrderDao]
})
export class OrderModule {}
