import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router }                 from '@angular/router';
import { FormControl }            from '@angular/forms';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { MenuTime }               from '../../common/model/menu-time.model';
import { QueryInput }             from '../../common/model/query-input.model';
import { AppComponent }           from '../../app.component';
import { AppConfig }              from '../../app.config';

import { Menu }                   from '../menu.model';
import { MenuService }            from '../menu.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';



/**
 * List Menu
 *
 * @export
 * @class MenuListComponent
 * @implements {OnInit}
 */
@Component({
  selector:           'app-menu-list',
  templateUrl:        './menu-list.component.html',
  styleUrls:          ['./menu-list.component.css'],
  encapsulation:      ViewEncapsulation.None
})
export class MenuListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection:          SelectionModel<Menu>;
  total:              number;
  columns:            Array<string>;
  pivot:              Array<string>;
  dataSource:         MatTableDataSource<Menu>;
  dataSourceCopy:     MatTableDataSource<Menu>;
  filter:             Menu;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  actionClick:        boolean;
  centerContent:      boolean;

  timeList:           Array<MenuTime>;

  /**
   * Constructor
   *
   * @param MenuService service
   */
  constructor(
    private router:           Router,
    private service:          MenuService,
    private material:         MaterialService,
    public  loader:           LoaderService
  ) {

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
    this.columns        = ['select', 'id', 'name', 'day', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
    this.selection      = new SelectionModel<MenuTime>(true, []);
    this.filter         = new Menu();
    this.timeList       = new Array<MenuTime>();

    this.queryTime();
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
      'page':    0,
      'include': 'time'
    }).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
      this.loading             = false;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Menu item
   */
  public deleteConfirm(item: SelectionModel<Menu>) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir esse cardápio?', 'CANCELAR', 'EXCLUIR')
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

    this.service.delete(id).subscribe(data => {
      this.dataSourceCopy.data = JSON.parse(JSON.stringify(this.dataSource.data));
      this.material.snackBar('Cardápio excluído.', 'OK');
    }, error => {
      this.dataSource.data     = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir cardápio.', error);
    });
  }

  // TIME SECTION --------------------
  /**
   * List all times of this menu
   */
  public queryTime() {
    this.timeList = new Array<any>();
    this.timeList = JSON.parse(JSON.stringify(AppConfig.DAYS));
  }

  /**
   * Verify if menu contains a day and print
   * @param day any
   * @param list Array<any>
   */
  public verifyDays(day: any, list: Array<any>) {
    return list.find(time => time.day === day);
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




  // OTHERS -----------------------------------
  /**
   * Go to details
   * @param company_id number
   * @param id number
   */
  public goDetails(company_id: number, id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'menu', id]);
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
