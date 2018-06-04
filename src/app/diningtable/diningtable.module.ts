import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { HttpClientModule }             from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }               from '@r-material/material.module';

import { DiningtableRoutingModule }     from '@r-diningtable/diningtable-routing.module';
import { DiningtableService }           from '@r-diningtable/diningtable.service';
import { DiningtableDao }               from '@r-diningtable/diningtable.dao';
import { DiningtableListComponent }     from '@r-diningtable/diningtable-list/diningtable-list.component';
import { DiningtableDetailsComponent }  from '@r-diningtable/diningtable-details/diningtable-details.component';
import { DiningtableFormComponent }     from '@r-diningtable/diningtable-form/diningtable-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DiningtableRoutingModule
  ],
  declarations: [DiningtableListComponent, DiningtableDetailsComponent, DiningtableFormComponent],
  providers:    [DiningtableService, DiningtableDao]
})
export class DiningtableModule {}
