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
  encapsulation:      ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total:              number;
  columns:            Array<string>;
  dataSource:         any;
  dataSourceCopy:     any;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  filter:             Category = new Category();
  actionClick:        boolean;
  centerContent:      boolean;

  // autocomplete
  parentList          = [];
  categoryControl:    FormControl;
  filteredCategories: Observable<Category[]>;
  categorySelected:   string|Category = '';

  delayTimer;
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
    this.loading        = true;
    this.actionClick    = false;
    this.centerContent  = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['id', 'name', 'parent_id', 'parent.data.name', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();

    // this.categoryOption();
    this.queryParent();
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    // Verify if sidenav is opened
    Observable.merge(this.parent.sidenav.openedChange)
      .subscribe(data => {
        this.centerContent = !data;
      });

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
      'include': 'parent'
    }).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Query parent category list to selectbox
   */
  public queryParent() {
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
    this.dataSource.data = this.dataSourceCopy.data.filter(item => this.material.filterList(item, this.filter));
  }

  /**
   * Open dialog to confirm delete
   * @param Category item
   */
  public deleteConfirm(item: Category) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa categoria?', 'CANCELAR', 'EXCLUIR')
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
    const snackBar = this.material.snackBar('Excluindo', 'Desfazer');

    snackBar.afterOpened().subscribe(() => {
      // O delay deve ser feito na API
      this.delayTimer  = setTimeout(() => {
        this.service.delete(id).subscribe(data => {
          this.dataSourceCopy.data = JSON.parse(JSON.stringify(this.dataSource.data));
          this.material.snackBar('Categoria excluída.', 'OK');
        }, error => {
          this.dataSource.data = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
          this.material.error('Erro ao excluir filial.', error);
        });
      }, 5000);
    });

    snackBar.onAction().subscribe(() => {
      clearTimeout(this.delayTimer);
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
    });
  }

  /* AUTO COMPLETE
  private categoryOption() {
    //Start category options list
    this.queryParent();
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
