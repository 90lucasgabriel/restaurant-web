import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpClientModule }         from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }           from '@r-material/material.module';

import { MenuRoutingModule }        from '@r-menu/menu-routing.module';
import { MenuService }              from '@r-menu/menu.service';
import { MenuDao }                  from '@r-menu/menu.dao';
import { MenuListComponent }        from '@r-menu/menu-list/menu-list.component';
import { MenuDetailsComponent }     from '@r-menu/menu-details/menu-details.component';
import { MenuFormComponent }        from '@r-menu/menu-form/menu-form.component';

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
