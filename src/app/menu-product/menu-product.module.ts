import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClientModule }           from '@angular/common/http';

import { MenuProductService }         from './menu-product.service';
import { MenuProductDao }             from './menu-product.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:    [MenuProductService, MenuProductDao]
})
export class MenuProductModule {}
