import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { MenuListComponent }      from './menu-list/menu-list.component';
import { MenuFormComponent }      from './menu-form/menu-form.component';
import { MenuDetailsComponent }   from './menu-details/menu-details.component';

const menuRoutes: Routes = [
  { path: 'company/:company_id/menu/:id/edit',  component: MenuFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/menu/new',       component: MenuFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/menu/:id',       component: MenuDetailsComponent,  pathMatch: 'full' },
  { path: 'company/:company_id/menu',           component: MenuListComponent,     pathMatch: 'full' }
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
