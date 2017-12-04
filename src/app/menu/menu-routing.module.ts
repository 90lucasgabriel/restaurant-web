import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { MenuListComponent }      from './menu-list/menu-list.component';
import { MenuFormComponent }      from './menu-form/menu-form.component';
import { MenuDetailsComponent }   from './menu-details/menu-details.component';

const menuRoutes: Routes = [
  { path: 'company/:company_id/menu/:id/edit',  component: MenuFormComponent },
  { path: 'company/:company_id/menu/new',       component: MenuFormComponent },
  { path: 'company/:company_id/menu/:id',       component: MenuDetailsComponent },
  { path: 'company/:company_id/menu',           component: MenuListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuRoutingModule {}
