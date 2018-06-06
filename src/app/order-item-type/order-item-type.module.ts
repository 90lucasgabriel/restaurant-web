import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }         from '@r-material/material.module';

import { OrderItemTypeRoutingModule }    from '@r-order-item-type/order-item-type-routing.module';
import { OrderItemTypeService }          from '@r-order-item-type/order-item-type.service';
import { OrderItemTypeDao }              from '@r-order-item-type/order-item-type.dao';
// import { OrderItemTypeListComponent }    from '@r-order-item-type/order-item-type-list/order-item-type-list.component';
// import { OrderItemTypeDetailsComponent } from '@r-order-item-type/order-item-type-details/order-item-type-details.component';
// import { OrderItemTypeFormComponent }    from '@r-order-item-type/order-item-type-form/order-item-type-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderItemTypeRoutingModule
  ],
  declarations: [/*OrderItemTypeListComponent, OrderItemTypeDetailsComponent, OrderItemTypeFormComponent*/],
  providers:    [OrderItemTypeService, OrderItemTypeDao]
})
export class OrderItemTypeModule {}
