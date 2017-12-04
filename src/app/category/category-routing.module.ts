import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { CategoryListComponent }    from './category-list/category-list.component';
import { CategoryFormComponent }    from './category-form/category-form.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const categoryRoutes: Routes = [
  { path: 'company/:company_id/category/:id/edit',  component: CategoryFormComponent },
  { path: 'company/:company_id/category/new',       component: CategoryFormComponent },
  { path: 'company/:company_id/category/:id',       component: CategoryDetailsComponent },
  { path: 'company/:company_id/category',           component: CategoryListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(categoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoryRoutingModule {}
