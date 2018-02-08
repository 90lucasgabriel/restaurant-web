import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { HttpClientModule }              from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }                from '@r-material/material.module';
import { CategoryModule }                from '@r-category/category.module';

import { OrderDetailRoutingModule }      from '@r-order-detail/order-detail-routing.module';
import { OrderDetailService }            from '@r-order-detail/order-detail.service';
import { OrderDetailDao }                from '@r-order-detail/order-detail.dao';
import { OrderDetailListComponent }      from '@r-order-detail/order-detail-list/order-detail-list.component';
// import { OrderDetailDetailsComponent }   from '@r-order-detail/order-detail-details/order-detail-details.component';
// import { OrderDetailFormComponent }      from '@r-order-detail/order-detail-form/order-detail-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderDetailRoutingModule
  ],
  declarations: [OrderDetailListComponent],
  providers:    [OrderDetailService, OrderDetailDao]
})
export class OrderDetailModule {}
