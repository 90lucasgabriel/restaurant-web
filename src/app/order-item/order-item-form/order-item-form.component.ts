import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { ANIMATION }              from '@r-material/material-animation';

import { Diningtable }            from '@r-diningtable/diningtable.model';
import { DiningtableService }     from '@r-diningtable/diningtable.service';
import { Menu }                   from '@r-menu/menu.model';
import { MenuService }            from '@r-menu/menu.service';
import { Order }                  from '@r-order/order.model';
import { OrderService }           from '@r-order/order.service';
import { OrderItemStatus }        from '@r-order-item-status/order-item-status.model';
import { OrderItemStatusService } from '@r-order-item-status/order-item-status.service';
import { OrderItemType }          from '@r-order-item-type/order-item-type.model';
import { OrderItemTypeService }   from '@r-order-item-type/order-item-type.service';
import { OrderItem }              from '@r-order-item/order-item.model';
import { OrderItemService }       from '@r-order-item/order-item.service';
import { Product }                from '@r-product/product.model';
import { ProductService }         from '@r-product/product.service';
import { Presenter }              from '@r-model/presenter.model';
import { MenuProduct }            from '@r-model/menu-product.model';

@Component({
  selector:                 'app-order-item-form',
  templateUrl:              './order-item-form.component.html',
  styleUrls:                ['./order-item-form.component.css'],
  encapsulation:            ViewEncapsulation.None,
  animations:               [ ANIMATION ]
})
export class OrderItemFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     OrderItem = new OrderItem();
  oldItem:                  OrderItem;
  items:                    Array<OrderItem> = new Array<OrderItem>();
  company_id:               number;
  branch_id:                number;

  newItemMode:              boolean;
  title:                    string;

  imagePreview = '';

  diningtableList:          Array<Diningtable>;
  menuList:                 Array<Menu>;
  orderList:                Array<Order>;
  orderItemStatusList:      Array<OrderItemStatus>;
  orderItemTypeList:        Array<OrderItemType>;
  productList:              Array<Product>;
  selectedOrder: Order;

  /**
   * Execute before onInit
   */
  public start() {
    this.submitted   = false;
    this.newItemMode = true;

    this.queryDiningtable();
    this.queryMenu();
    this.queryOrder();
    this.queryOrderItemStatus();
    this.queryOrderItemType();
    this.queryProduct();

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.get(+params['id']);
      } else {
        this.company_id      = +params['company_id'];
        this.branch_id       = +params['branch_id'];
        this.setNewItem(true);
      }
    });
  }

  /**
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Novo Pedido';
    } else {
      this.newItemMode = false;
      this.title       = 'Editar Pedido';
    }
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {'include': 'parent'}).subscribe(success => {
      this.setNewItem(false);
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
    });
  }

  /**
   * Submit data to create or update
   * @param OrderItem item
   */
  public submitForm(fullItem: OrderItem) {
    const item                  = new OrderItem();
    this.submitted              = true;

    // MatSelect components return an object, not just the id
    // So, it is necessary to create an object OrderItem with ids and others properties
    // Some properties can be found in others properties. It's not necessary call API again.
    const selectedProduct       = <Product> fullItem.product; // Selected product in matSelect
    const selectedMenu          = <Menu> fullItem.menu;       // Selected menu in matSelect
    const menuProductList       = selectedMenu.product;       // ProductList in menu with prices
    const menuProduct           = <MenuProduct> menuProductList.data.filter((data) => data.id === selectedProduct.id);  // Filter selected product with price

    item.order_id               = (<Order> fullItem.order).id;
    item.menu_id                = selectedMenu.id;
    item.product_id             = (<Product> fullItem.product).id;
    item.diningtable_id         = (<Order> fullItem.order).diningtable.data.id;
    item.order_item_status_id   = fullItem.order_item_status_id;
    item.order_item_type_id     = fullItem.order_item_type_id;
    item.price_person           = selectedMenu.price_person;
    item.price_alacarte         = menuProduct.price;
    item.quantity               = fullItem.quantity;
    item.comment                = fullItem.comment;

    console.log(item);
    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param OrderItem item
   */
  public save(item: OrderItem) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Nova conta criada', 'OK');
    }, error => {
      console.log('Erro ao criar conta', error);
      this.material.snackBar('Erro ao criar conta. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Send update request
   * @param OrderItem item
   * @param number id
   */
  public update(item: OrderItem, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Pedido atualizado', 'OK');
    }, error => {
      console.log('Erro ao atualizar conta', error);
      this.material.snackBar('Erro ao atualizar conta. Detalhes no console (F12).', 'OK');
    });
  }



// DININGTABLE SECTION -----------------------------
  /**
   * Return a list of Diningtable
   */
  public queryDiningtable() {
    this.diningtableService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.diningtableList = data.data;
    });
  }



// MENU SECTION ------------------------
  /**
   * Return a list of Menu
   */
  public queryMenu() {
    this.menuService.query({
      'orderBy':      'id',
      'sortedBy':     'asc',
      'include':      'product'
    }).subscribe(data => {
      this.menuList = data.data;
    });
  }




// ORDER SECTION ------------------------
  /**
   * Return a list of Order
   */
  public queryOrder() {
    this.orderService.query({
      'orderBy':      'id',
      'sortedBy':     'asc',
      'include':      'diningtable'
    }).subscribe(data => {
      this.orderList = data.data;
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




// PRODUCT SECTION ------------------------
  /**
   * Return a list of Product
   */
  public queryProduct() {
    this.productService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.productList = data.data;
    });
  }




// OTHERS SECTION -------------------------------------
  /**
   * Constructor
   * @param Router                router
   * @param ActivatedRoute        route
   * @param Location              location
   * @param MaterialService       material
   * @param OrderItemService          service
   * @param OrderItemStatusService    service
   * @param DiningtableServie     diningtable service
   */
  constructor(
    private router:                   Router,
    private route:                    ActivatedRoute,
    private location:                 Location,
    public  material:                 MaterialService,
    public  loader:                   LoaderService,
    private service:                  OrderItemService,
    private diningtableService:       DiningtableService,
    private menuService:              MenuService,
    private orderService:             OrderService,
    private orderItemStatusService:   OrderItemStatusService,
    private orderItemTypeService:     OrderItemTypeService,
    private productService:           ProductService,
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
  }

  public previewImage(event) {
    // this.item.image = event.srcElement.files[0].name;
  }

  /**
   * Cancel form and read mode
   */
  public cancelForm(): void {
    this.goBack();
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
