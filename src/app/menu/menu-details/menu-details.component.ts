import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '../../app.component';
import { QueryInput }             from '../../common/model/query-input.model';
import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';

import { ProductService }         from '../../product/product.service';

import { Menu }                   from '../menu.model';
import { MenuService }            from '../menu.service';
import { MenuDao }                from '../menu.dao';

/**
 * Menu's details
 * @class MenuDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-menu-details',
  templateUrl:              './menu-details.component.html',
  styleUrls:                ['./menu-details.component.css'],
  providers:                [MenuService, MenuDao],
  encapsulation:            ViewEncapsulation.None
})
export class MenuDetailsComponent implements OnInit, OnDestroy {
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Menu;
  oldItem:                  Menu;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param MenuService   service
   * @param MatSnackBar     snackBar
   */
  constructor(
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        MenuService,
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
    this.service.get(id, {'include': 'parent'}).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); //copy
    }, error => {
      console.log('Erro ao pesquisar cardápio', error);
      this.material.snackBar('Erro ao pesquisar cardápio. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Menu item
   */
  public deleteConfirm(item: Menu) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa cardápio?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Cardápio excluído.', 'OK');
      this.goBack();
    }, error => {
      console.log('Erro ao excluir cardápio', error);
      this.material.snackBar('Erro ao excluir cardápio. Detalhes no console (F12).', 'OK');
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
