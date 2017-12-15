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
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', 'opacity': 1}),
            animate('100ms', style({transform: 'translateY(100%)', 'opacity': 0}))
          ]
        )
      ]
    )
  ],
  encapsulation:      ViewEncapsulation.None
})
export class BranchListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total:              number;
  columns:            Array<string>;
  dataSource:         any;

  private sub:        any;
  loading:            boolean = true;
  showFilter:         boolean;
  items:              Array<Branch>;
  filter:             Branch = new Branch();
  oldFilter:          Branch = new Branch();

  actionClick:        boolean;
  search:             string;
  delayTimer;

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
    this.search         = '';
    this.total          = 0;
    this.columns        = ['id', 'address', 'number', 'city', 'state', 'phone_1', 'actions'];
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
      }, 1500);
    }
  }

  /**
   * Open dialog to confirm delete
   * @param Branch item
   */
  public deleteConfirm(item: Branch) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa filial?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Filial excluída.', 'OK');
    }, error => {
      console.log('Erro ao excluir filial', error);
      this.material.snackBar('Erro ao excluir filial. Detalhes no console (F12).', 'OK');
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
