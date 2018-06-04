import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { Location }                   from '@angular/common';

import { AppComponent }               from '@r-app/app.component';
import { LoaderService }              from '@r-service/loader.service';
import { MaterialService }            from '@r-material/material.service';
import { QueryInput }                 from '@r-model/query-input.model';

import { Diningtable }                from '@r-diningtable/diningtable.model';
import { DiningtableService }         from '@r-diningtable/diningtable.service';

/**
 * Diningtable's details
 * @class DiningtableDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-diningtable-details',
  templateUrl:              './diningtable-details.component.html',
  styleUrls:                ['./diningtable-details.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class DiningtableDetailsComponent implements OnInit, OnDestroy {
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Diningtable;
  oldItem:                  Diningtable;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param DiningtableService   service
   * @param MatSnackBar     snackBar
   */
  constructor(
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        DiningtableService,
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
   * @param Diningtable item
   */
  public deleteConfirm(item: Diningtable) {
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
