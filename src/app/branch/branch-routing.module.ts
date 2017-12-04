import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { BranchListComponent }    from './branch-list/branch-list.component';
import { BranchFormComponent }    from './branch-form/branch-form.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';

const branchRoutes: Routes = [
  { path: 'company/:company_id/branch/:id/edit',  component: BranchFormComponent },
  { path: 'company/:company_id/branch/new',       component: BranchFormComponent },
  { path: 'company/:company_id/branch/:id',       component: BranchDetailsComponent },
  { path: 'company/:company_id/branch',           component: BranchListComponent }
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
