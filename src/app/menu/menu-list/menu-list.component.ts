import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Router }                 from '@angular/router';
import { FormControl }            from '@angular/forms';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';
import { AppComponent }           from '../../app.component';

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
  total:              number;
  columns:            Array<string>;
  dataSource:         any;

  private sub:        any;
  loading:            boolean = true;
  showFilter:         boolean;
  items:              Array<Menu>;
  menuSelected:       string|Menu = '';
  filter:             Menu = new Menu();
  oldFilter:          Menu = new Menu();

  actionClick:        boolean;
  search:             string;
  delayTimer;

  /**
   * Constructor
   *
   * @param MenuService service
   */
  constructor(
    @Inject(AppComponent) private parent: AppComponent,
    private router:           Router,
    private service:          MenuService,
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
    this.actionClick    = false;
    this.showFilter     = false;
    this.search         = '';
    this.total          = 0;
    this.columns        = ['id', 'name', 'actions'];
    this.dataSource     = new MatTableDataSource();
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.query();
  }

  /**
   * Show list items on datatable
   */
  public query() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub = Observable.merge(this.sort.sortChange, this.paginator.page)
    .startWith(null)
    .switchMap(() => {
      return this.service.query({
        'orderBy':      this.sort.active,
        'sortedBy':     this.sort.direction,
        'page':         this.paginator.pageIndex + 1,
        'perPage':      this.paginator.pageSize,
        'search':       this.search,
        'searchJoin':   'and'
      });
    })
    .map(data => {
      this.total        = data.meta.pagination.total;
      return data.data;
    })
    .catch((error) => {
      console.log('Erro ao pesquisar na API', error);
      this.material.snackBar('Erro ao pesquisar na API. Detalhes no console (F12).', 'OK');
      return Observable.of([]);
    })
    .subscribe(data => {
      this.dataSource.data = data;
    });
  }

  /**
   * Apply filter when key up
   */
  public applyFilter() {
    if (JSON.stringify(this.filter) !== JSON.stringify(this.oldFilter)) {
      clearTimeout(this.delayTimer);
      this.delayTimer  = setTimeout(() => {
        this.search    = this.material.searchToQueryString(this.filter);
        this.oldFilter = JSON.parse(JSON.stringify(this.filter));
        this.query();
      }, 1100);
    }
  }

  /**
   * Open dialog to confirm delete
   * @param Menu item
   */
  public deleteConfirm(item: Menu) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir esse cardápio?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
    this.service.delete(id).subscribe(data => {
      this.query();
      this.material.snackBar('Cardápio excluído.', 'OK');
    }, error => {
      console.log('Erro ao excluir cardápio', error);
      this.material.snackBar('Erro ao excluir cardápio. Detalhes no console (F12).', 'OK');
    });
  }

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
