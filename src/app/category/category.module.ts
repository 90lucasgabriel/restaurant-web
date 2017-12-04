import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { MaterialModule }         from '../material/material.module';

import { CategoryRoutingModule }    from './category-routing.module';
import { CategoryService }          from './category.service';
import { CategoryDao }              from './category.dao';
import { CategoryListComponent }    from './category-list/category-list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryFormComponent }    from './category-form/category-form.component';

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
