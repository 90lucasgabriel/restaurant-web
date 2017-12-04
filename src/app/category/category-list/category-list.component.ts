import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { trigger, transition, style, animate, state} from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Router }                 from '@angular/router';
import { FormControl }            from '@angular/forms';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';
import { AppComponent }           from '../../app.component';

import { Category }               from '../category.model';
import { CategoryService }        from '../category.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';


/**
 * List Category
 *
 * @export
 * @class CategoryListComponent
 * @implements {OnInit}
 */
@Component({
  selector:           'app-category-list',
  templateUrl:        './category-list.component.html',
  styleUrls:          ['./category-list.component.css'],
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
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total:              number;
  loadingResults:     boolean;
  timeout:            boolean;
  columns:            Array<string>;
  dataSource:         any;

  private sub:        any;
  loading:            boolean;
  centerContent:      boolean;
  showFilter:         boolean;
  items:              Array<Category>;
  categorySelected:   string|Category = '';
  filter:             Category = new Category();
  oldFilter:          Category = new Category();

  actionClick:        boolean;
  search:             string;
  delayTimer;

  //autocomplete
  parentList          = [];
  categoryControl:    FormControl;
  filteredCategories: Observable<Category[]>;


  /**
   * Constructor
   *
   * @param CategoryService service
   */
  constructor(
    @Inject(AppComponent) private parent: AppComponent,
    private router:     Router,
    private service:    CategoryService,
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
  private start() {
    this.actionClick    = false;
    this.centerContent  = false;
    this.showFilter     = false;
    this.search         = '';
    this.total          = 0;
    this.columns        = ['id', 'name', 'parent_id', 'parent.data.name', 'actions'];
    this.dataSource     = new MatTableDataSource();

    //this.categoryOption();
    this.queryAll();
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    // Verify if sidenav is open
    Observable.merge(this.parent.sidenav.openedChange)
      .subscribe(data => {
        this.centerContent = !data;
      });
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
        'include':      'parent',
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

  public queryAll() {
    this.service.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.parentList = data.data;
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
   * @param Category item
   */
  public deleteConfirm(item: Category) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa categoria?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Categoria excluída.', 'OK');
    }, error => {
      console.log('Erro ao excluir categoria', error);
      this.material.snackBar('Erro ao excluir categoria. Detalhes no console (F12).', 'OK');
    });
  }

  /*
  private categoryOption() {
    //Start category options list
    this.queryAll();
    this.categoryControl = new FormControl();
    this.filteredCategories = this.categoryControl.valueChanges
      .startWith(null)
      .map(item => item && typeof item === 'object' ? item.name : item)
      .map(item => item ? this.filterCategories(item) : this.parentList.slice());
  }

  private filterCategories(name: string) {
    this.filter.parent_id = this.categorySelected.id;
    return this.parentList.filter(item =>
      item.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  public displayName(item: any): string {
    return item ? `${item.id} - ${item.name}` : item;
  }
  */

  /**
   * Go to details
   * @param company_id number
   * @param id number
   */
  public goDetails(company_id: number, id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'category', id]);
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
