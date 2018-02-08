import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';
import { FlexLayoutModule }           from '@angular/flex-layout';

import { AppComponent }               from '@r-app/app.component';
import { AppConfig }                  from '@r-app/app.config';
import { AppRoutingModule }           from '@r-app/app-routing.module';
import { MaterialModule }             from '@r-material/material.module';

import { MaterialService }            from '@r-material/material.service';
import { LoaderService }              from '@r-service/loader.service';
import { LoaderInterceptor }          from '@r-interceptor/loader.interceptor';
import { HeaderInterceptor }          from '@r-interceptor/header.interceptor';

import { BranchModule }               from '@r-branch/branch.module';
import { CategoryModule }             from '@r-category/category.module';
import { CompanyModule }              from '@r-company/company.module';
import { MenuModule }                 from '@r-menu/menu.module';
import { OrderModule }                from '@r-order/order.module';
import { OrderDetailModule }          from '@r-order-detail/order-detail.module';
import { OrderStatusModule }          from '@r-order-status/order-status.module';
import { ProductModule }              from '@r-product/product.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    MaterialModule,

    BranchModule,
    CategoryModule,
    CompanyModule,
    MenuModule,
    OrderModule,
    OrderDetailModule,
    OrderStatusModule,
    ProductModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule],
  bootstrap: [AppComponent],
  providers: [
    MaterialService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      useFactory: (service: LoaderService) => new LoaderInterceptor(service),
      multi: true,
      deps: [LoaderService]
    }
  ]
})
export class AppModule { }
