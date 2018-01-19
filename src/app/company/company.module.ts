import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';

import { MaterialModule }         from '@r-material/material.module';

import { CompanyRoutingModule }   from '@r-company/company-routing.module';
import { CompanyListComponent }   from '@r-company/company-list/company-list.component';
import { CompanyDao }             from '@r-company/company.dao';

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
