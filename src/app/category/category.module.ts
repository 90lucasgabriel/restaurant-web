import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }         from '@r-material/material.module';

import { CategoryRoutingModule }    from '@r-category/category-routing.module';
import { CategoryService }          from '@r-category/category.service';
import { CategoryDao }              from '@r-category/category.dao';
import { CategoryListComponent }    from '@r-category/category-list/category-list.component';
import { CategoryDetailsComponent } from '@r-category/category-details/category-details.component';
import { CategoryFormComponent }    from '@r-category/category-form/category-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ],
  declarations: [CategoryListComponent, CategoryDetailsComponent, CategoryFormComponent],
  providers:    [CategoryService, CategoryDao]
})
export class CategoryModule {}
