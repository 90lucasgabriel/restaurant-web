import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';

import { MaterialModule }         from '../material/material.module';

import { CompanyRoutingModule }   from './company-routing.module';
import { CompanyListComponent }   from './company-list/company-list.component';
import { CompanyDao }             from './company.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    CompanyRoutingModule
  ],
  declarations: [CompanyListComponent]
})
export class CompanyModule {}
