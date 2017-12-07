import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { BranchListComponent }    from './branch-list/branch-list.component';
import { BranchFormComponent }    from './branch-form/branch-form.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';

const branchRoutes: Routes = [
  { path: 'company/:company_id/branch/:id/edit',  component: BranchFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/branch/new',       component: BranchFormComponent,     pathMatch: 'full' },
  { path: 'company/:company_id/branch/:id',       component: BranchDetailsComponent,  pathMatch: 'full' },
  { path: 'company/:company_id/branch',           component: BranchListComponent,     pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(branchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BranchRoutingModule {}
