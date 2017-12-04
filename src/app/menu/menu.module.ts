import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpClientModule }         from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }           from '../material/material.module';

import { MenuRoutingModule }        from './menu-routing.module';
import { MenuService }              from './menu.service';
import { MenuDao }                  from './menu.dao';
import { MenuListComponent }        from './menu-list/menu-list.component';
import { MenuDetailsComponent }     from './menu-details/menu-details.component';
import { MenuFormComponent }        from './menu-form/menu-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MenuRoutingModule
  ],
  declarations: [MenuListComponent, MenuDetailsComponent, MenuFormComponent],
  providers:    [MenuService, MenuDao]
})
export class MenuModule {}
