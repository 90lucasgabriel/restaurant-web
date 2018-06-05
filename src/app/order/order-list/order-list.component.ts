import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, Host, Inject } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router }                 from '@angular/router';

import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { AppComponent }           from '@r-app/app.component';
import { ANIMATION }              from '@r-material/material-animation';

import { OrderItem }              from '@r-order-item/order-item.model';
import { Order }                  from '@r-order/order.model';
import { OrderService }           from '@r-order/order.service';
import { OrderStatus }            from '@r-order-status/order-status.model';
import { OrderStatusService }     from '@r-order-status/order-status.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * Order List Controller
 * @export
 * @class OrderListComponent
 * @implements {OnInit}
 */
@Component({
  selector:           'app-order-list',
  templateUrl:        './order-list.component.html',
  styleUrls:          ['./order-list.component.css'],
  encapsulation:      ViewEncapsulation.None,
  animations:         [ ANIMATION ]
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
// DECLARATIONS ---------------------
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection:          SelectionModel<Order>;
  total:              number;
  columns:            Array<string>;
  pivot:              Array<string>;
  dataSource:         MatTableDataSource<Order>;
  dataSourceCopy:     MatTableDataSource<Order>;
  filter:             Order;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  actionClick:        boolean;
  centerContent:      boolean;

  orderStatusList:    Array<OrderStatus>;

  orderDetailStatusList = [
    {id: 1, name: 'Aberto'},
    {id: 2, name: 'Preparação'},
    {id: 3, name: 'Pronto'},
    {id: 4, name: 'Entregando'},
    {id: 5, name: 'Concluído'},
    {id: 6, name: 'Cancelado'}
  ];


// MAIN -----------------------------
  /**
   * Execute before onInit
   */
  private start() {
    this.actionClick        = false;
    this.showFilter         = false;
    this.total              = 0;
    this.columns            = ['select', 'id', 'diningtable.data.code', 'order_status_id', 'orderStatus.data.name', 'total', 'actions'];
    this.dataSource         = new MatTableDataSource();
    this.dataSourceCopy     = new MatTableDataSource();
    this.selection          = new SelectionModel<Order>(true, []);
    this.filter             = new Order();
    this.orderStatusList    = new Array<OrderStatus>();

    this.filter         = {
      order_status_id: 1,
      diningtable: {
        data: {
          code: null
        }
      }
    };
    // this.filterOrderItem = new OrderItem();

    this.queryOrderStatus();
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
      'page': 0,
      'include': 'diningtable,orderStatus,orderDetail.product,orderDetail.orderDetailStatus'
    }).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Order item
   */
  public deleteConfirm(item: SelectionModel<Order>) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa conta?', 'CANCELAR', 'EXCLUIR')
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
    this.selection.deselect(this.selection.selected.find(i => i.id === id));

    this.service.delete(id).subscribe(data => {
      this.dataSourceCopy.data = JSON.parse(JSON.stringify(this.dataSource.data));
      this.material.snackBar('Conta excluída.', 'OK');
    }, error => {
      this.selection.select(this.selection.selected.find(i => i.id === id));
      this.dataSource.data     = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir conta.', error);
    });
  }




  // ORDERSTATUS SECTION -----------------
  /**
   * Query order_status list to selectbox
   */
  public queryOrderStatus() {
    this.orderStatusService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.orderStatusList = data.data;
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
   * @param OrderService service
   */
  constructor(
    private router:             Router,
    private service:            OrderService,
    private orderStatusService: OrderStatusService,
    private material:           MaterialService,
    public  loader:             LoaderService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
  }

  /**
   * Go to details
   * @param company_id number
   * @param id number
   */
  public goDetails(company_id: number, branch_id: number, id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'branch', branch_id, 'order', id]);
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
