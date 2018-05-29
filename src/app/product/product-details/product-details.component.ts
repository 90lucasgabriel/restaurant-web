import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '@r-app/app.component';
import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { ANIMATION }              from '@r-material/material-animation';

import { Product }                from '@r-product/product.model';
import { ProductService }         from '@r-product/product.service';

/**
 * Product's details
 * @class ProductDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-product-details',
  templateUrl:              './product-details.component.html',
  styleUrls:                ['./product-details.component.css'],
  encapsulation:            ViewEncapsulation.None,
  animations:               [ ANIMATION ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Product;
  oldItem:                  Product;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param ProductService   service
   * @param MatSnackBar     snackBar
   */
  constructor(
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        ProductService,
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
    this.service.get(id, {'include': 'category'}).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
    }, error => {
      console.log('Erro ao pesquisar produto', error);
      this.material.snackBar('Erro ao pesquisar produto. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Product item
   */
  public deleteConfirm(item: Product) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa produto?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      console.log('Erro ao excluir produto', error);
      this.material.snackBar('Erro ao excluir produto. Detalhes no console (F12).', 'OK');
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
