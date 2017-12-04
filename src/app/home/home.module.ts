import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [
    HomeAdminComponent
  ]
})
export class HomeModule { }
