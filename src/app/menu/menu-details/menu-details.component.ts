import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '@r-app/app.component';
import { AppConfig }              from '@r-app/app.config';
import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { MenuTime }               from '@r-model/menu-time.model';

import { Day }                    from '@r-enum/day.enum';
import { Product }                from '@r-product/product.model';
import { ProductService }         from '@r-product/product.service';
import { Branch }                 from '@r-branch/branch.model';
import { BranchService }          from '@r-branch/branch.service';
import { Menu }                   from '@r-menu/menu.model';
import { MenuService }            from '@r-menu/menu.service';

/**
 * @export
 * @class MenuDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector:                 'app-menu-details',
  templateUrl:              './menu-details.component.html',
  styleUrls:                ['./menu-details.component.css'],
  providers:                [MenuService],
  encapsulation:            ViewEncapsulation.None
})
export class MenuDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
// DECLARATIONS --------------------------
  private sub:              any;
  submitted:                boolean;
  loading = {
    get:      true,
    product:  true,
    branch:   true,
  };

  itemLoaded:               EventEmitter<boolean> = new EventEmitter<boolean>();
  item:                     Menu;

  timeLoaded:               EventEmitter<boolean> = new EventEmitter<boolean>();
  timeSelection:            SelectionModel<MenuTime>;
  timeColumns:              Array<string>;
  timePivot:                Array<string>;
  timeDataSource:           any;
  timeDataSourceCopy:       any;

  @ViewChild('productPaginator') productPaginator: MatPaginator;
  @ViewChild(MatSort) productSort;
  productLoaded:             EventEmitter<boolean> = new EventEmitter<boolean>();
  productTotal:              number;
  productColumns:            Array<string>;
  productPivot:              Array<string>;
  productDataSource:         any;
  productDataSourceCopy:     any;
  productFilter:             Product;

  @ViewChild('branchPaginator') branchPaginator: MatPaginator;
  @ViewChild(MatSort) branchSort;
  branchLoaded:             EventEmitter<boolean> = new EventEmitter<boolean>();
  branchTotal:              number;
  branchColumns:            Array<string>;
  branchDataSource:         any;
  branchDataSourceCopy:     any;
  branchFilter:             Branch;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.verifyEmit();

    this.item      = new Menu();
    this.submitted = false;

    this.sub = this.route.params.subscribe(params => {
      this.get(+params['id']);
    });

    this.startTime();
    this.startProduct();
    this.startBranch();
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.productDataSource.sort      = this.productSort;
    this.productDataSource.paginator = this.productPaginator;

    this.branchDataSource.sort       = this.branchSort;
    this.branchDataSource.paginator  = this.branchPaginator;
  }

  /**
   * Show item details
   * @param {number} id
   * @memberof MenuDetailsComponent
   */
  public get(id: number) {
    this.service.get(id, {'include': 'category,time,branch,product'}).subscribe(success => {
      this.item = success.data;
      this.itemLoaded.emit(true);
    }, error => {
      this.material.error('Erro ao pesquisar cardápio', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param {Menu} item
   * @memberof MenuDetailsComponent
   */
  public deleteConfirm(item: Menu) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir esse cardápio?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Cardápio excluído.', 'OK');
      this.goBack();
    }, error => {
      this.material.error('Erro ao excluir cardápio', error);
    });
  }




  // TIME SECTION --------------------
  public startTime() {
    this.timeColumns        = ['day', 'time_start', 'time_end'];
    this.timePivot          = ['time_start', 'time_end'];
    this.timeDataSource     = new MatTableDataSource();
    this.timeDataSourceCopy = new MatTableDataSource();
    this.timeSelection      = new SelectionModel<MenuTime>(true, []);

    this.queryTime();
  }

  /**
   * List all times of this menu on menu_time table
   */
  public queryTime() {
    this.timeDataSource.data     = AppConfig.DAYS;
    this.timeDataSourceCopy.data = AppConfig.DAYS;
    this.timeLoaded.emit(true);
  }




  // PRODUCT SECTION --------------------
  public startProduct() {
    this.productTotal               = 0;
    this.productColumns             = ['id', 'name', 'category_id', 'category.data.name', 'price'];
    this.productPivot               = ['price'];
    this.productDataSource          = new MatTableDataSource();
    this.productDataSourceCopy      = new MatTableDataSource();
    this.productFilter              = new Product();
  }

  /**
   * List all products of this company
   */
  public queryProduct() {
    this.productTotal               = this.item.product.data.length;
    this.productDataSource.data     = this.item.product.data;
    this.productDataSourceCopy.data = this.item.product.data;
    this.loading.product            = false;
  }




  // BRANCH SECTION --------------------------
  public startBranch() {
    this.branchTotal                = 0;
    this.branchColumns              = ['id', 'address', 'city', 'state'];
    this.branchDataSource           = new MatTableDataSource();
    this.branchDataSourceCopy       = new MatTableDataSource();
    this.branchFilter               = new Branch();
  }

   /**
   * List all products of this company
   */
  public queryBranch() {
    this.branchTotal                = this.item.branch.data.length;
    this.branchDataSource.data      = this.item.branch.data;
    this.branchDataSourceCopy.data  = this.item.branch.data;
    this.loading.branch             = false;
  }




// DATATABLE AUX SECTION -----------------
  /**
   * List all branch selection of this menu
   */
  public querySelection(
    selectedList:   Array<any>,
    selection:      SelectionModel<any>,
    dataSourceCopy: MatTableDataSource<any>,
    pivot?:         Array<string>,
    key?:           string) {
    this.material.querySelection(selectedList, selection, dataSourceCopy, pivot, key);
  }

  /**
   * Apply filter when key up
   */
  public applyFilter(dataSource: MatTableDataSource<any>, dataSourceCopy: MatTableDataSource<any>, filter: any) {
    this.material.applyFilter(dataSource, dataSourceCopy, filter);
  }

  /**
   * Verify selected items when emit == true.
   * Time, Product and Branch will be loaded only after item is loaded.
   */
  private verifyEmit() {
    this.itemLoaded.subscribe(iLoaded => {
      if (iLoaded) {
        // Show all days and select specifics.
        this.querySelection(this.item.time.data, this.timeSelection, this.timeDataSourceCopy, this.timePivot, 'day');

        // Doesn't show all items, only specifics.
        this.queryProduct();
        this.queryBranch();
      }
    });
  }




// OTHERS SECTION ------------------------
  /**
   * Creates an instance of MenuDetailsComponent.
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @param {MenuService} service
   * @param {ProductService} productService
   * @param {BranchService} branchService
   * @memberof MenuDetailsComponent
   */
  constructor(
    private router:             Router,
    private route:              ActivatedRoute,
    private location:           Location,
    public  material:           MaterialService,
    public  loader:             LoaderService,
    private service:            MenuService,
    private productService:     ProductService,
    private branchService:      BranchService,
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading.get = isLoading;
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
