import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Router }                 from '@angular/router';
import { FormControl }            from '@angular/forms';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';
import { AppComponent }           from '../../app.component';

import { Product }                from '../product.model';
import { ProductService }         from '../product.service';
import { Category }               from '../../category/category.model';
import { CategoryService }        from '../../category/category.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * List Product
 *
 * @export
 * @class ProductListComponent
 * @implements {OnInit}
 */
@Component({
  selector:           'app-product-list',
  templateUrl:        './product-list.component.html',
  styleUrls:          ['./product-list.component.css'],
  encapsulation:      ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total:              number;
  columns:            Array<string>;
  dataSource:         any;
  dataSourceCopy:     any;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  filter:             Product;
  actionClick:        boolean;
  centerContent:      boolean;

  categoryList:       Array<Category>;

  /**
   * Constructor
   *
   * @param ProductService service
   */
  constructor(
    private router:           Router,
    private service:          ProductService,
    private categoryService:  CategoryService,
    private material:         MaterialService,
    public  loader:           LoaderService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });

    this.start();
  }

  /**
   * Execute before onInit
   */
  private start() {
    this.loading        = true;
    this.actionClick    = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['image', 'id', 'name', 'category_id', 'category.data.name', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
    this.filter         = new Product();
    this.categoryList   = new Array<Category>();

    this.queryCategory();
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.query();
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Show list items on datatable
   */
  public query() {
    this.sub = this.service.query({
      'page': 0,
      'include': 'category'
    }).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Query caegory list to selectbox
   */
  public queryCategory() {
    this.categoryService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.categoryList = data.data;
    });
  }

  /**
   * Apply filter when key up
   */
  public applyFilter() {
    this.dataSource.data = this.dataSourceCopy.data.filter(item => this.material.filterList(item, this.filter));
  }

  /**
   * Open dialog to confirm delete
   * @param Product item
   */
  public deleteConfirm(item: Product) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir esse produto?', 'CANCELAR', 'EXCLUIR')
      .subscribe(data => {
        this.actionClick = false;
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
    const dataTmp              = JSON.parse(JSON.stringify(this.dataSource.data));
    dataTmp.splice(this.dataSource.data.findIndex(i => i.id === id), 1);
    this.dataSource.data       = JSON.parse(JSON.stringify(dataTmp));

    this.service.delete(id).subscribe(data => {
      this.dataSourceCopy.data = JSON.parse(JSON.stringify(this.dataSource.data));
      this.material.snackBar('Produto excluído.', 'OK');
    }, error => {
      this.dataSource.data     = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir produto.', error);
    });
  }

  /**
   * Go to details
   * @param company_id number
   * @param id number
   */
  public goDetails(company_id: number, id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'product', id]);
    }
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
