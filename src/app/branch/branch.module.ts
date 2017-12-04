import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule }            from '@angular/forms';
import { MaterialModule }         from '../material/material.module';

import { BranchRoutingModule }    from './branch-routing.module';
import { BranchService }          from './branch.service';
import { BranchDao }              from './branch.dao';
import { BranchListComponent }    from './branch-list/branch-list.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { BranchFormComponent }    from './branch-form/branch-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    BranchRoutingModule
  ],
  declarations: [BranchListComponent, BranchDetailsComponent, BranchFormComponent],
  providers:    [BranchService, BranchDao]
})
export class BranchModule {}
