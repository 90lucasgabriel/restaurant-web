import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '@r-app/app.component';
import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';

import { Category }               from '@r-category/category.model';
import { CategoryService }        from '@r-category/category.service';

/**
 * Category's details
 * @export
 * @class CategoryDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-category-details',
  templateUrl:              './category-details.component.html',
  styleUrls:                ['./category-details.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
// DECLARATIONS --------------------------
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Category;
  oldItem:                  Category;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.submitted = false;
    this.sub = this.route.params.subscribe(params => {
      this.get(+params['id']);
    });
  }

  /**
   * Show item details
   * @param {number} id
   * @memberof CategoryDetailsComponent
   */
  public get(id: number) {
    this.service.get(id, {'include': 'parent'}).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
    }, error => {
      this.material.error('Erro ao pesquisar categoria.', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param {Category} item
   * @memberof CategoryDetailsComponent
   */
  public deleteConfirm(item: Category) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa categoria?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
      if (data) {
        this.delete(item.id);
      }
    });
  }

  /**
   * Delete resource
   * @param {number} id
   * @memberof CategoryDetailsComponent
   */
  public delete(id: number) {
    this.submitted = true;
    this.service.delete(id).subscribe(data => {
      this.material.snackBar('Categoria excluída.', 'OK');
      this.goBack();
    }, error => {
      this.material.error('Erro ao excluir categoria.', error);
    });
  }




// OTHERS --------------------------------
  /**
   * Creates an instance of CategoryDetailsComponent.
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {CategoryService} service
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @memberof CategoryDetailsComponent
   */
  constructor(
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        CategoryService,
    public  material:       MaterialService,
    public  loader:         LoaderService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
  }

  /**
   * Go to latest route
   */
  public goBack() {
    this.location.back();
  }

  /**
   * Execute on init
   */
  public ngOnInit() {

  }

  /**
   * Execute on destroy
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
