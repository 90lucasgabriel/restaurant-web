import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { Location }                   from '@angular/common';

import { AppComponent }               from '@r-app/app.component';
import { LoaderService }              from '@r-service/loader.service';
import { MaterialService }            from '@r-material/material.service';
import { QueryInput }                 from '@r-model/query-input.model';

import { OrderStatus }                from '@r-order-status/order-status.model';
import { OrderStatusService }         from '@r-order-status/order-status.service';

/**
 * OrderStatus's details
 * @class OrderStatusDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-order-status-details',
  templateUrl:              './order-status-details.component.html',
  styleUrls:                ['./order-status-details.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class OrderStatusDetailsComponent implements OnInit, OnDestroy {
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     OrderStatus;
  oldItem:                  OrderStatus;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param OrderStatusService   service
   * @param MatSnackBar     snackBar
   */
  constructor(
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

  public start() {
    this.submitted = false;
    this.sub = this.route.params.subscribe(params => {
      this.get(+params['id']);
    });
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {}).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item));
    }, error => {
      this.material.error('Erro ao pesquisar status de pedido', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param OrderStatus item
   */
  public deleteConfirm(item: OrderStatus) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir status de pedido?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Produto excluído.', 'OK');
      this.goBack();
    }, error => {
      this.material.error('Erro ao excluir status de pedido', error);
    });
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
