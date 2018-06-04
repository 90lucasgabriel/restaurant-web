import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DiningtableListComponent }    from '@r-diningtable/diningtable-list/diningtable-list.component';
// import { DiningtableFormComponent }    from '@r-diningtable/diningtable-form/diningtable-form.component';
// import { DiningtableDetailsComponent } from '@r-diningtable/diningtable-details/diningtable-details.component';

const diningtableRoutes: Routes = [
//  { path: 'diningtable/:id/edit',  component: DiningtableFormComponent,     pathMatch: 'full'},
//  { path: 'diningtable/new',       component: DiningtableFormComponent,     pathMatch: 'full' },
//  { path: 'diningtable/:id',       component: DiningtableDetailsComponent,  pathMatch: 'full' },
  { path: 'diningtable',           component: DiningtableListComponent,     pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(diningtableRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DiningtableRoutingModule {}
