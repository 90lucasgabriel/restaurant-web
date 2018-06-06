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
import { OrderItemService }       from '@r-order-item/order-item.service';
import { OrderItemStatus }        from '@r-order-item-status/order-item-status.model';
import { OrderItemStatusService } from '@r-order-item-status/order-item-status.service';
import { OrderItemType }          from '@r-order-item-type/order-item-type.model';
import { OrderItemTypeService }   from '@r-order-item-type/order-item-type.service';

/**
 * List OrderItem
 * @export
 * @class OrderItemListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector:           'app-order-item-list',
  templateUrl:        './order-item-list.component.html',
  styleUrls:          ['./order-item-list.component.css'],
  encapsulation:      ViewEncapsulation.None,
  animations:         [ ANIMATION ]
})
export class OrderItemListComponent implements OnInit, OnDestroy, AfterViewInit {
// DECLARATIONS --------------------------
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection:          SelectionModel<OrderItem>;
  total:              number;
  columns:            Array<string>;
  pivot:              Array<string>;
  dataSource:         MatTableDataSource<OrderItem>;
  dataSourceCopy:     MatTableDataSource<OrderItem>;
  filter:             OrderItem;

  private sub:        any;
  loading:            boolean;
  showFilter:         boolean;
  actionClick:        boolean;
  centerContent:      boolean;

  orderItemStatusList:      Array<OrderItemStatus>;
  orderItemTypeList:        Array<OrderItemType>;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.loading        = true;
    this.actionClick    = false;
    this.showFilter     = false;
    this.total          = 0;
    this.columns        = ['select', 'id', 'product', 'quantity', 'diningtable', 'order_item_type', 'order_item_status',  'comment', 'actions'];
    this.dataSource     = new MatTableDataSource();
    this.dataSourceCopy = new MatTableDataSource();
    this.selection      = new SelectionModel<OrderItem>(true, []);
    this.filter         = new OrderItem();
    this.filter = {
      order_item_status_id: [1, 2, 3, 4],
      product: {
        data: {
          name: ''
        }
      }
    };

    this.queryOrderItemStatus();
    this.queryOrderItemType();
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
      'include': 'product,diningtable,order,orderItemStatus,orderItemType,menu'
    }).subscribe(data => {
      this.total               = data.data.length;
      this.dataSource.data     = data.data;
      this.dataSourceCopy.data = data.data;
      this.applyFilter(this.dataSource, this.dataSourceCopy, this.filter);
      this.loading             = false;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param {SelectionModel<OrderItem>} item
   * @memberof OrderItemListComponent
   */
  public deleteConfirm(item: SelectionModel<OrderItem>) {
    this.actionClick = true;
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa pedido?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Pedido excluída.', 'OK');
    }, error => {
      this.selection.select(this.selection.selected.find(i => i.id === id));
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSourceCopy.data));
      this.material.error('Erro ao excluir pedido.', error);
    });
  }





// ORDER ITEM STATUS SECTION ------------------------
  /**
   * Return a list of OrderItemStatus
   */
  public queryOrderItemStatus() {
    this.orderItemStatusService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.orderItemStatusList = data.data;
    });
  }




// ORDER ITEM TYPE SECTION ------------------------
  /**
   * Return a list of OrderItemType
   */
  public queryOrderItemType() {
    this.orderItemTypeService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.orderItemTypeList = data.data;
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
   * @param OrderItemService service
   */
  constructor(
    private router:                   Router,
    private material:                 MaterialService,
    public  loader:                   LoaderService,
    private service:                  OrderItemService,
    private orderItemStatusService:   OrderItemStatusService,
    private orderItemTypeService:     OrderItemTypeService,
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
  }

  /**
   * Go to Product details
   * @param company_id number
   * @param id number
   */
  public goDetailsProduct(company_id: number, product_id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'product', product_id]);
    }
  }

  /**
   * Go to Order details
   * @param company_id number
   * @param branch_id number
   * @param order_id number
   */
  public goDetailsOrder(company_id: number, branch_id: number, order_id: number) {
    if (!this.actionClick) {
      this.router.navigate(['/company', company_id, 'branch', branch_id, 'order', order_id]);
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



  /**
   * Show list items on datatable
   */
  /*public queryByOrderItem() {
    this.sub = this.service.queryByOrderItem({
      'page': 0,
      'include': 'diningtable,product,orderItemStatus'
    }).subscribe(data => {
      this.orderItemList            = data.data;
      this.orderItemListCopy        = data.data;
    }, error => {
      this.material.error('Erro ao pesquisar na API.', error);
    });
  }*/
