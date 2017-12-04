import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '../../app.component';
import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

import { Category }               from '../category.model';
import { CategoryService }        from '../category.service';

/**
 * Category's details
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
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Category;
  oldItem:                  Category;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param CategoryService   service
   * @param MatSnackBar     snackBar
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

  public start() {
    this.submitted = false;
    this.sub = this.route.params.subscribe(params => {
      this.get(+params['id']);
    });
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {'include': 'parent'}).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); //copy
    }, error => {
      console.log('Erro ao pesquisar categoria', error);
      this.material.snackBar('Erro ao pesquisar categoria. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Category item
   */
  public deleteConfirm(item: Category) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa categoria?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
      if (data === true) {
        this.delete(item.id);
      }
    });
  }

  /**
   * Delete resource
   * @param number id
   */
  public delete(id: number) {
    this.submitted = true;
    this.service.delete(id).subscribe(data => {
      this.material.snackBar('Categoria excluída.', 'OK');
      this.goBack();
    }, error => {
      console.log('Erro ao excluir categoria', error);
      this.material.snackBar('Erro ao excluir categoria. Detalhes no console (F12).', 'OK');
    });
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
