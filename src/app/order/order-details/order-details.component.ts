import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Observable }             from 'rxjs';
import { SelectionModel }         from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '@r-app/app.component';
import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { ANIMATION }              from '@r-material/material-animation';

import { Presenter }              from '@r-model/presenter.model';
import { Diningtable }            from '@r-diningtable/diningtable.model';
import { DiningtableService }     from '@r-diningtable/diningtable.service';
import { OrderItem }              from '@r-order-item/order-item.model';
import { OrderStatus }            from '@r-order-status/order-status.model';
import { OrderStatusService }     from '@r-order-status/order-status.service';
import { Order }                  from '@r-order/order.model';
import { OrderService }           from '@r-order/order.service';

@Component({
  selector:                 'app-order-details',
  templateUrl:              './order-details.component.html',
  styleUrls:                ['./order-details.component.css'],
  encapsulation:            ViewEncapsulation.None,
  animations:               [ ANIMATION ]
})
export class OrderDetailsComponent implements OnInit, OnDestroy, AfterViewInit  {
// DECLARATIONS --------------------------
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)       sort: MatSort;
  selection:                SelectionModel<OrderItem>;
  total:                    number;
  columns:                  Array<string>;
  pivot:                    Array<string>;
  dataSource:               MatTableDataSource<OrderItem>;
  dataSourceCopy:           MatTableDataSource<OrderItem>;
  filter:                   OrderItem;
  orderItemList:            Presenter<Array<OrderItem>>;

  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Order;
  oldItem:                  Order;
  showFilter:               boolean;
  actionClick:              boolean;
  centerContent:            boolean;
  result:                   Promise<Presenter<Order>>;



// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.submitted          = false;
    this.actionClick        = false;
    this.showFilter         = false;
    this.total              = 0;
    this.columns            = ['select', 'id', 'product_image', 'product', 'orderItemStatus', 'quantity', 'price_alacarte', 'actions'];
    this.dataSource         = new MatTableDataSource();
    this.dataSourceCopy     = new MatTableDataSource();
    this.selection          = new SelectionModel<OrderItem>(true, []);
    this.filter             = new OrderItem();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.result = this.getAsync(+params['id']);

        this.result.then(success => {
          this.item    = success.data;
          this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
        }, error => {
          console.log('Erro ao pesquisar conta', error);
          this.material.snackBar('Erro ao pesquisar conta. Detalhes no console (F12).', 'OK');
        });
      }
    });
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.result.then(success => {
      this.orderItemList      = <Presenter<Array<OrderItem>>> success.data.orderItem;
      this.total                = this.orderItemList.data.length;
      this.dataSource.data      = this.orderItemList.data;
      this.dataSourceCopy.data  = this.orderItemList.data;
    }, error => {
      console.log('Erro ao pesquisar conta', error);
      this.material.snackBar('Erro ao pesquisar conta. Detalhes no console (F12).', 'OK');
    });
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Return a Promise to send a single request
   * @param {number} id
   * @returns {Promise<Presenter<Order>>}
   * @memberof OrderDetailsComponent
   */
  public getAsync(id: number): Promise<Presenter<Order>> {
    return this.service.get(id,
      {'include': `diningtable,orderStatus,orderItem.product,orderItem.orderItemStatus`})
      .toPromise();
  }

  /**
   * Open dialog to confirm delete
   * @param Order item
   */
  public deleteConfirm(item: Order) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa conta?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
    this.submitted = true;
    this.service.delete(id).subscribe(data => {
      this.material.snackBar('Conta excluída.', 'OK');
      this.goBack();
    }, error => {
      console.log('Erro ao excluir conta', error);
      this.material.snackBar('Erro ao excluir conta. Detalhes no console (F12).', 'OK');
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




// OTHERS SECTION ------------------------
    /**
   * Constructor
   * @param Router                router
   * @param ActivatedRoute        route
   * @param Location              location
   * @param MaterialService       material
   * @param OrderService          service
   * @param OrderStatusService    service
   * @param DiningtableServie     diningtable service
   */
  constructor(
    private router:               Router,
    private route:                ActivatedRoute,
    private location:             Location,
    public  material:             MaterialService,
    public  loader:               LoaderService,
    private service:              OrderService,
    private orderStatusService:   OrderStatusService,
    private diningtableService:   DiningtableService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
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
  public ngOnInit() {

  }

  /**
   * Execute on destroy
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
