import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule }            from '@angular/forms';
import { MaterialModule }         from '@r-material/material.module';

import { BranchRoutingModule }    from '@r-branch/branch-routing.module';
import { BranchService }          from '@r-branch/branch.service';
import { BranchDao }              from '@r-branch/branch.dao';
import { BranchListComponent }    from '@r-branch/branch-list/branch-list.component';
import { BranchDetailsComponent } from '@r-branch/branch-details/branch-details.component';
import { BranchFormComponent }    from '@r-branch/branch-form/branch-form.component';

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
