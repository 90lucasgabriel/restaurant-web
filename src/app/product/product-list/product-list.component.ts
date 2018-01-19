import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router }                 from '@angular/router';

import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { AppComponent }           from '@r-app/app.component';

import { Category }               from '@r-category/category.model';
import { CategoryService }        from '@r-category/category.service';
import { Product }                from '@r-product/product.model';
import { ProductService }         from '@r-product/product.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * Product List Controller
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
// DECLARATIONS ---------------------
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection:          SelectionModel<Product>;
  total:              number;
  columns:            Array<string>;
  pivot:              Array<string>;
  dataSource:         MatTableDataSource<Product>;
  dataSourceCopy:     MatTableDataSource<Product>;
  filter:             Product;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  actionClick:        boolean;
  centerContent:      boolean;

  categoryList:       Array<Category>;




// MAIN -----------------------------
  /**
   * Execute before onInit
   */
  private start() {
    this.actionClick    = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['select', 'image', 'id', 'name', 'category_id', 'category.data.name', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
    this.selection      = new SelectionModel<Product>(true, []);
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
   * Open dialog to confirm delete
   * @param Product item
   */
  public deleteConfirm(item: SelectionModel<Product>) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir esse produto?', 'CANCELAR', 'EXCLUIR')
      .subscribe(data => {
        this.actionClick = false;
        if (data) {
          item.selected.forEach(i => this.delete(i.id));
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
    this.selection.deselect(this.selection.selected.find(i => i.id === id));

    this.service.delete(id).subscribe(data => {
      this.dataSourceCopy.data = JSON.parse(JSON.stringify(this.dataSource.data));
      this.material.snackBar('Produto excluído.', 'OK');
    }, error => {
      this.selection.select(this.selection.selected.find(i => i.id === id));
      this.dataSource.data     = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir produto.', error);
    });
  }




// CATEGORY SECTION -----------------
  /**
   * Query category list to selectbox
   */
  public queryCategory() {
    this.categoryService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.categoryList = data.data;
    });
  }




// DATATABLE AUX SECTION ------------
  /**
   * Apply filter when key up
   */
  public applyFilter(dataSource: MatTableDataSource<any>, dataSourceCopy: MatTableDataSource<any>, filter: any) {
    this.material.applyFilter(dataSource, dataSourceCopy, filter);
  }

  /**
   * Whether the number of selected elements matches
   * the total number of rows.
   */
  public isAllSelected(dataSourceCopy: MatTableDataSource<any>, selection: SelectionModel<any>) {
    return this.material.isAllSelected(dataSourceCopy, selection);
  }

  /**
   * Selects all rows if they are not all selected;
   * otherwise clear selection.
   */
  public masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    this.material.masterToggle(dataSource, selection);
  }




// OTHERS ---------------------------
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
