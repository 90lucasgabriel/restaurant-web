import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router }                 from '@angular/router';

import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { AppComponent }           from '@r-app/app.component';

import { Branch }                 from '@r-branch/branch.model';
import { BranchService }          from '@r-branch/branch.service';

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
// DECLARATIONS --------------------------
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection:          SelectionModel<Branch>;
  total:              number;
  columns:            Array<string>;
  pivot:              Array<string>;
  dataSource:         MatTableDataSource<Branch>;
  dataSourceCopy:     MatTableDataSource<Branch>;
  filter:             Branch;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  actionClick:        boolean;
  centerContent:      boolean;

  parentList:         Array<Branch>;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.loading        = true;
    this.actionClick    = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['select', 'id', 'address', 'number', 'city', 'state', 'phone_1', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
    this.selection      = new SelectionModel<Branch>(true, []);
    this.filter         = new Branch();
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
      'page': 0
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
   * @param {SelectionModel<Branch>} item 
   * @memberof BranchListComponent
   */
  public deleteConfirm(item: SelectionModel<Branch>) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa filial?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Filial excluída.', 'OK');
    }, error => {
      this.selection.select(this.selection.selected.find(i => i.id === id));
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir filial.', error);
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
   * @param BranchService service
   */
  constructor(
    @Inject(AppComponent) private parent: AppComponent,
    private router:     Router,
    private service:    BranchService,
    private material:   MaterialService,
    public  loader:     LoaderService
  ) {
    this.start();
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
