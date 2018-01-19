import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { CompanyListComponent }     from '@r-company/company-list/company-list.component';

const companyRoutes: Routes = [
  { path: 'company',        component: CompanyListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(companyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRoutingModule {}
