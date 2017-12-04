
import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { HttpClientModule }           from '@angular/common/http';

import { MenuBranchService }          from './menu-branch.service';
import { MenuBranchDao }              from './menu-branch.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:    [MenuBranchService, MenuBranchDao]
})
export class MenuBranchModule {}
