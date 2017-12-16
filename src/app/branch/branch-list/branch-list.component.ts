import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Router }                 from '@angular/router';


import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';
import { AppComponent }           from '../../app.component';

import { Branch }                 from '../branch.model';
import { BranchService }          from '../branch.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * List Branch
 *
 * @export
 * @class BranchListComponent
 * @implements {OnInit}
 */
@Component({
  selector:           'app-branch-list',
  templateUrl:        './branch-list.component.html',
  styleUrls:          ['./branch-list.component.css'],
  encapsulation:      ViewEncapsulation.None
})
export class BranchListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total:              number;
  columns:            Array<string>;
  dataSource:         any;
  dataSourceCopy:     any;

  private sub:        any;
  loading:            boolean = true;
  showFilter:         boolean;
  filter:             Branch = new Branch();
  actionClick:        boolean;

  /**
   * Constructor
   *
   * @param BranchService service
   */
  constructor(
    @Inject(AppComponent) private parent: AppComponent,
    private router:     Router,
    private service:    BranchService,
    private material:   MaterialService,
    public  loader:     LoaderService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });

    this.start();
  }

  /**
   * Execute before onInit
   */
  public start() {
    this.actionClick    = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['id', 'address', 'number', 'city', 'state', 'phone_1', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
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
    this.sub = this.service.query({'page': 0}).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Apply filter when key up
   */
  public applyFilter() {
    this.dataSource.data = this.dataSourceCopy.data.filter(branch => this.material.filterList(branch, this.filter));
  }

  /**
   * Open dialog to confirm delete
   * @param Branch item
   */
  public deleteConfirm(item: Branch) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa filial?', 'CANCELAR', 'EXCLUIR')
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
      this.material.snackBar('Filial excluída.', 'OK');
    }, error => {
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir filial.', error);
    });
  }

  /**
   * Go to details
   * @param company_id number
   * @param id number
   */
  public goDetails(company_id: number, id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'branch', id]);
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
