import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeAdminComponent }    from './home-admin/home-admin.component';

const homeRoutes: Routes = [
  { path: '',           component: HomeAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}