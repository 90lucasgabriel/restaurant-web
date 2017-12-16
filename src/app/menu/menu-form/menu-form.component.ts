import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ViewChildren, OnDestroy,  Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppConfig }              from '../../app.config';
import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

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
import { Day } from '../../day.enum';


@Component({
  selector:                 'app-menu-form',
  templateUrl:              './menu-form.component.html',
  styleUrls:                ['./menu-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class MenuFormComponent implements OnInit, OnDestroy, AfterViewInit  {
  private sub:              any;
  submitted:                boolean;
  loading = {
    get:      true,
    product:  true,
    branch:   true,
  };


  item:                     Menu        = new Menu();
  items:                    Array<Menu> = new Array<Menu>();
  company_id:               number;
  menu_id:                  number;

  newItemMode:              boolean;
  title:                    string;
  message:                  string;

  timeList:                 Array<any>     = new Array<any>();
  timeListChecked:          Array<any>     = new Array<any>();

  @ViewChild('productPaginator') productPaginator: MatPaginator;
  @ViewChild(MatSort) productSort;
  productSelection:          SelectionModel<Product> = new SelectionModel<Product>(true, []);
  productTotal:              number;
  productColumns:            Array<string>;
  productDataSource:         any;
  productDataSourceCopy:     any;
  productFilter:             Product;

  @ViewChild('branchPaginator') branchPaginator: MatPaginator;
  @ViewChild(MatSort) branchSort;
  branchSelection:          SelectionModel<Branch> = new SelectionModel<Branch>(true, []);
  branchTotal:              number;
  branchColumns:            Array<string>;
  branchDataSource:         any;
  branchDataSourceCopy:     any;
  branchFilter:             Branch;

  imagePreview = '';

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

    this.startProduct();
    this.startBranch();

    this.queryTime();
  }


  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.productDataSource.sort      = this.productSort;
    this.productDataSource.paginator = this.productPaginator;

    this.branchDataSource.sort      = this.branchSort;
    this.branchDataSource.paginator = this.branchPaginator;
  }



  /**
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
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
      this.queryTimeSelected();
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
    this.submitted = true;
    this.productFilter = null;
    this.branchFilter  = null;

    this.item.company_id    = this.company_id;
    this.timeListChecked    = this.timeList.filter(time => time.checked);
    // this.productListChecked = this.productList.filter(product => product.checked);
    // this.branchListChecked  = this.branchList.filter(branch => branch.checked);

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
    /*Observable.of(this.service.save(item))
    .switchMap(() => this.service.save(item))
      .map(menu => this.menu_id = menu.data.id)
    .switchMap(() => this.service.syncTime(this.timeListChecked, this.menu_id ))
    .switchMap(() => this.service.syncProduct(this.productListChecked, this.menu_id ))
    .switchMap(() => this.service.syncBranch(this.branchListChecked, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });*/
  }

  /**
   * Send update request
   * @param Menu item
   * @param number id
   */
  public update(item: Menu, id: number) {
    /*Observable.of(this.service.update(item, id))
    .switchMap(menu => this.service.update(item, id))
    .switchMap(()   => this.service.syncTime(this.timeListChecked, this.menu_id))
    .switchMap(()   => this.service.syncProduct(this.productListChecked, this.menu_id))
    .switchMap(()   => this.service.syncBranch(this.branchListChecked, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });*/
  }

  // TIME SECTION --------------------
  /**
   * List all times of this menu on menu_time table
   */
  public queryTime() {
    this.timeList = new Array<any>();
    this.timeList = JSON.parse(JSON.stringify(AppConfig.DAYS));
  }

  /**
   * Search each time by day of week on menu_time table
   * and set values and checked in local list
   */
  public queryTimeSelected() {
    for (const p of this.item.time.data) {
      this.timeList.find(time => time.day === p.day).day        = p.day;
      this.timeList.find(time => time.day === p.day).time_start = p.time_start;
      this.timeList.find(time => time.day === p.day).time_end   = p.time_end;
      this.timeList.find(time => time.day === p.day).checked    = true;
    }
  }




  // PRODUCT SECTION --------------------
  public startProduct() {
    this.productTotal          = 0;
    this.productColumns        = ['select', 'id', 'name', 'category_id'];
    this.productDataSource     = new MatTableDataSource();
    this.productDataSourceCopy = new MatTableDataSource();
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
      if (!this.newItemMode) {
        this.querySelection(this.item.product.data, this.productSelection, this.productDataSourceCopy);
      }
    });
  }

  /**
   * Search each product by id on menu_product table
   * and set values and checked in local list
   
  public queryMenuProduct() {
    for (const p of this.item.product.data) {
      this.productList.find(product => product.id === p.id).price   = p.price;
      this.productList.find(product => product.id === p.id).checked = true;
    }
  }*/



  // BRANCH SECTION --------------------------
  public startBranch() {
    this.branchTotal          = 0;
    this.branchColumns        = ['select', 'id', 'address', 'city', 'state'];
    this.branchDataSource     = new MatTableDataSource();
    this.branchDataSourceCopy = new MatTableDataSource();
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
      if (!this.newItemMode) {
        this.querySelection(this.item.branch.data, this.branchSelection, this.branchDataSourceCopy);
      }
    });
  }




  // DATATABLE AUX SECTION ---------------------------
  /**
   * List all branch selection of this menu
   */
  public querySelection(list: Array<any>, selection: SelectionModel<any>, dataSourceCopy: MatTableDataSource<any>) {
    for (const p of list) {
      selection.select(dataSourceCopy.data.find(item => item.id === p.id));
    }
  }

  /**
   * Apply filter when key up
   */
  public applyFilter(dataSource: MatTableDataSource<any>, dataSourceCopy: MatTableDataSource<any>, filter: any) {
    dataSource.data = dataSourceCopy.data.filter(item => this.material.filterList(item, filter));
  }

  /**
   * Whether the number of selected elements matches
   * the total number of rows.
   */
  public isAllSelected(dataSourceCopy: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected = selection.selected.length;
    const numRows     = dataSourceCopy.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected;
   * otherwise clear selection.
   */
  public masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    this.isAllSelected(dataSource, selection) ?
        selection.clear() :
        dataSource.data.forEach(row => selection.select(row));
  }




  // OTHERS SECTION ---------------------------
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
