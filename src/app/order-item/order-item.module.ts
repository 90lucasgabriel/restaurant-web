import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { HttpClientModule }              from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }                from '@r-material/material.module';
import { CategoryModule }                from '@r-category/category.module';

import { OrderItemRoutingModule }      from '@r-order-item/order-item-routing.module';
import { OrderItemService }            from '@r-order-item/order-item.service';
import { OrderItemDao }                from '@r-order-item/order-item.dao';
import { OrderItemListComponent }      from '@r-order-item/order-item-list/order-item-list.component';
// import { OrderItemItemsComponent }   from '@r-order-item/order-item-details/order-item-details.component';
// import { OrderItemFormComponent }      from '@r-order-item/order-item-form/order-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderItemRoutingModule
  ],
  declarations: [OrderItemListComponent],
  providers:    [OrderItemService, OrderItemDao]
})
export class OrderItemModule {}
