import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';

import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppConfig }              from '../../app.config';
import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';
import { MenuTime }               from '../../common/model/menu-time.model';

import { Day }                    from '../../day.enum';
import { Product }                from '../../product/product.model';
import { ProductService }         from '../../product/product.service';
import { Branch }                 from '../../branch/branch.model';
import { BranchService }          from '../../branch/branch.service';
import { Menu }                   from '../menu.model';
import { MenuService }            from '../menu.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';



@Component({
  selector:                 'app-menu-form',
  templateUrl:              './menu-form.component.html',
  styleUrls:                ['./menu-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class MenuFormComponent implements OnInit, OnDestroy, AfterViewInit  {
  private sub:               any;
  submitted:                 boolean;
  loading = {
    get:      true,
    product:  true,
    branch:   true,
  };

  itemLoaded:                EventEmitter<boolean> = new EventEmitter<boolean>();
  item:                      Menu;
  company_id:                number;
  menu_id:                   number;

  newItemMode:               boolean;
  title:                     string;
  message:                   string;


  timeLoaded:                EventEmitter<boolean> = new EventEmitter<boolean>();
  timeSelection:             SelectionModel<MenuTime>;
  timeColumns:               Array<string>;
  timePivot:                 Array<string>;
  timeDataSource:            any;
  timeDataSourceCopy:        any;

  @ViewChild('productPaginator') productPaginator: MatPaginator;
  @ViewChild(MatSort) productSort;
  productLoaded:             EventEmitter<boolean> = new EventEmitter<boolean>();
  productSelection:          SelectionModel<Product>;
  productTotal:              number;
  productColumns:            Array<string>;
  productPivot:              Array<string>;
  productDataSource:         any;
  productDataSourceCopy:     any;
  productFilter:             Product;

  @ViewChild('branchPaginator') branchPaginator: MatPaginator;
  @ViewChild(MatSort) branchSort;
  branchLoaded:             EventEmitter<boolean> = new EventEmitter<boolean>();
  branchSelection:          SelectionModel<Branch>;
  branchTotal:              number;
  branchColumns:            Array<string>;
  branchDataSource:         any;
  branchDataSourceCopy:     any;
  branchFilter:             Branch;

  /**
   * Constructor
   * @param Router          router
   * @param ActivatedRoute  route
   * @param Location        location
   * @param MenuService     service
   * @param MaterialService material
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
   * Execute before onInit
   */
  public start() {
    this.verifyEmit();

    this.item        = new Menu();
    this.submitted   = false;
    this.newItemMode = true;

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.setNewItem(false);
        this.get(+params['id']);
        this.menu_id = +params['id'];
      } else {
        this.setNewItem(true);
      }
      this.company_id      = +params['company_id'];
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
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.loading.get     = false;
      this.submitted       = true;
      this.newItemMode     = true;
      this.title           = 'Novo Cardápio';
      this.message         = 'Novo cardápio criado';
    } else {
      this.newItemMode     = false;
      this.title           = 'Editar Cardápio';
      this.message         = 'Cardápio atualizado';
    }
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {'include': 'category,time,branch,product'}).subscribe(success => {
      this.item        = success.data;
      this.loading.get = false;
      this.submitted   = true;
      this.itemLoaded.emit(true);
    }, error => {
      this.goBack();
      this.material.error('Cardápio não encontrado', error);
    });
  }

  /**
   * Submit data to create or update
   * @param Menu item
   */
  public submitForm(item: Menu) {
    this.submitted       = true;
    this.item.company_id = this.company_id;

    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.menu_id);
    }
  }

  /**
   * Send request to save
   * @param Menu item
   */
  public save(item: Menu) {
    Observable.of(this.service.save(item))
    .switchMap(() => this.service.save(item))
      .map(menu => this.menu_id = menu.data.id)
    .switchMap(() => this.service.syncTime(this.timeSelection.selected, this.menu_id ))
    .switchMap(() => this.service.syncProduct(this.productSelection.selected, this.menu_id ))
    .switchMap(() => this.service.syncBranch(this.branchSelection.selected, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });
  }

  /**
   * Send update request
   * @param Menu item
   * @param number id
   */
  public update(item: Menu, id: number) {
    Observable.of(this.service.update(item, id))
    .switchMap(menu => this.service.update(item, id))
    .switchMap(()   => this.service.syncTime(this.timeSelection.selected, this.menu_id))
    .switchMap(()   => this.service.syncProduct(this.productSelection.selected, this.menu_id))
    .switchMap(()   => this.service.syncBranch(this.branchSelection.selected, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });
  }




  // TIME SECTION --------------------
  public startTime() {
    this.timeColumns        = ['select', 'day', 'time_start', 'time_end'];
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
    this.productTotal          = 0;
    this.productColumns        = ['select', 'id', 'name', 'category_id', 'category.data.name', 'price'];
    this.productPivot          = ['price'];
    this.productDataSource     = new MatTableDataSource();
    this.productDataSourceCopy = new MatTableDataSource();
    this.productSelection      = new SelectionModel<Product>(true, []);
    this.productFilter         = new Product();

    this.queryProduct();
  }

  /**
   * List all products of this company
   */
  public queryProduct() {
    this.productService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.productTotal               = data.data.length;
      this.productDataSource.data     = data.data;
      this.productDataSourceCopy.data = data.data;
      this.loading.product            = false;
      this.productLoaded.emit(true);
    });
  }




  // BRANCH SECTION --------------------------
  public startBranch() {
    this.branchTotal          = 0;
    this.branchColumns        = ['select', 'id', 'address', 'city', 'state'];
    this.branchDataSource     = new MatTableDataSource();
    this.branchDataSourceCopy = new MatTableDataSource();
    this.branchSelection      = new SelectionModel<Branch>(true, []);
    this.branchFilter         = new Branch();

    this.queryBranch();
  }

   /**
   * List all products of this company
   */
  public queryBranch() {
    this.branchService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.branchTotal               = data.data.length;
      this.branchDataSource.data     = data.data;
      this.branchDataSourceCopy.data = data.data;
      this.loading.branch            = false;
      this.branchLoaded.emit(true);
    });
  }




  // DATATABLE AUX SECTION ---------------------------
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




  // OTHERS SECTION ---------------------------
  private verifyEmit() {
    this.itemLoaded.subscribe(loaded => {
      if (loaded && !this.newItemMode) {
        this.querySelection(this.item.time.data, this.timeSelection, this.timeDataSourceCopy, this.timePivot, 'day');
      }
    });
    this.productLoaded.subscribe(loaded => {
      if (loaded && !this.newItemMode) {
        this.querySelection(this.item.product.data, this.productSelection, this.productDataSourceCopy, this.productPivot);
      }
    });
    this.branchLoaded.subscribe(loaded => {
      if (loaded && !this.newItemMode) {
        this.querySelection(this.item.branch.data, this.branchSelection, this.branchDataSourceCopy);
      }
    });
  }

  /**
   * Go back and show message.
   */
  public accomplished() {
    this.goBack();
    this.material.snackBar(this.message, 'OK');
  }

  /**
   * Cancel form and read mode
   */
  public cancelForm(): void {
    this.goBack();
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
  public ngOnInit() { }

  /**
   * Execute on destroy
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
