import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS }           from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }                from '@angular/forms';
//import { FlexLayoutModule }         from '@angular/flex-layout';

import { AppComponent }               from './app.component';
import { AppConfig }                  from './app.config';
import { AppRoutingModule }           from './app-routing.module';
import { MaterialModule }             from './material/material.module';

import { MaterialService }            from './material/material.service';
import { LoaderService }              from './loader.service';
import { LoaderInterceptor }          from './loader.interceptor';
import { HeaderInterceptor }          from './header.interceptor';

import { BranchModule }               from './branch/branch.module';
import { CategoryModule }             from './category/category.module';
import { CompanyModule }              from './company/company.module';
import { HomeModule }                 from './home/home.module';
import { MenuModule }                 from './menu/menu.module';
import { MenuBranchModule }           from './menu-branch/menu-branch.module';
import { MenuProductModule }          from './menu-product/menu-product.module';
import { ProductModule }              from './product/product.module';
import { CustomCommonModule }         from './common/custom-common.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //FlexLayoutModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    CustomCommonModule,
    AppRoutingModule,
    MaterialModule,

    BranchModule,
    CategoryModule,
    CompanyModule,
    HomeModule,
    MenuModule,
    MenuBranchModule,
    MenuProductModule,
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
