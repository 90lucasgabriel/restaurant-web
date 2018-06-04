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
import { OrderStatus }            from '@r-order-status/order-status.model';
import { OrderStatusService }     from '@r-order-status/order-status.service';
import { Order }                  from '@r-order/order.model';
import { OrderService }           from '@r-order/order.service';

@Component({
  selector:                 'app-order-form',
  templateUrl:              './order-form.component.html',
  styleUrls:                ['./order-form.component.css'],
  encapsulation:            ViewEncapsulation.None,
  animations:               [ ANIMATION ]
})
export class OrderFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Order = new Order();
  oldItem:                  Order;
  items:                    Array<Order> = new Array<Order>();
  company_id:               number;
  branch_id:                number;

  newItemMode:              boolean;
  title:                    string;

  imagePreview = '';

  diningtableList:          Array<Diningtable>;
  orderStatusList:          Array<OrderStatus>;

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
   * Execute before onInit
   */
  public start() {
    this.submitted   = false;
    this.newItemMode = true;

    this.queryDiningtable();
    this.queryOrderStatus();

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.get(+params['id']);
      } else {
        this.company_id      = +params['company_id'];
        this.item.company_id = +params['company_id'];
        this.branch_id       = +params['branch_id'];
        this.item.branch_id  = +params['branch_id'];
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
      this.title       = 'Nova Conta';
    } else {
      this.newItemMode = false;
      this.title       = 'Editar Conta';
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
   * @param Order item
   */
  public submitForm(item: Order) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param Order item
   */
  public save(item: Order) {
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
   * @param Order item
   * @param number id
   */
  public update(item: Order, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Conta atualizada', 'OK');
    }, error => {
      console.log('Erro ao atualizar conta', error);
      this.material.snackBar('Erro ao atualizar conta. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Return a list of OrderStatus
   */
  public queryOrderStatus() {
    this.orderStatusService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.orderStatusList = data.data;
    });
  }

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
