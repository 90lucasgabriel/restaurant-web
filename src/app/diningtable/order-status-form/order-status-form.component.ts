import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';
import { Location }                  from '@angular/common';

import { LoaderService }             from '@r-service/loader.service';
import { MaterialService }           from '@r-material/material.service';
import { QueryInput }                from '@r-model/query-input.model';

import { OrderStatus }               from '@r-order-status/order-status.model';
import { OrderStatusService }        from '@r-order-status/order-status.service';

/**
 * OrderStatusFormComponent
 * @export
 * @class OrderStatusFormComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-order-status-form',
  templateUrl:              './order-status-form.component.html',
  styleUrls:                ['./order-status-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class OrderStatusFormComponent implements OnInit, OnDestroy {
// DECLARATIONS --------------------------
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     OrderStatus        = new OrderStatus();
  oldItem:                  OrderStatus;
  items:                    Array<OrderStatus> = new Array<OrderStatus>();
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.submitted   = false;
    this.newItemMode = true;

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.get(+params['id']);
      }  else {
        this.company_id      = +params['company_id'];
        this.setNewItem(true);
      }
    });
  }

  /**
   * Determine if is new item or edit item
   * @param {boolean} value
   * @memberof OrderStatusFormComponent
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Novo Status de pedido';
    } else {
      this.newItemMode = false;
      this.title       = 'Editar Status de pedido';
    }
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {}).subscribe(success => {
      this.setNewItem(false);
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item));
    });
  }

  /**
   * Submit data to create or update
   * @param {OrderStatus} item
   * @memberof OrderStatusFormComponent
   */
  public submitForm(item: OrderStatus) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param OrderStatus item
   */
  public save(item: OrderStatus) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Novo status de pedido criado', 'OK');
    }, error => {
      this.material.error('Erro ao criar status de pedido', error);
    });
  }

  /**
   * Send update request
   * @param OrderStatus item
   * @param number id
   */
  public update(item: OrderStatus, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Status de pedido atualizado', 'OK');
    }, error => {
      this.material.error('Erro ao atualizar status de pedido', error);
    });
  }

  /**
   * List all orderStatus.
   */
  public queryAll() {
    this.service.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.items = data.data;
    });
  }





// OTHERS --------------------------------
  /**
   * Creates an instance of OrderStatusFormComponent.
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {OrderStatusService} service
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @memberof OrderStatusFormComponent
   */
  constructor(
    private router:         Router,
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        OrderStatusService,
    public  material:       MaterialService,
    public  loader:         LoaderService
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
    this.start();
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
