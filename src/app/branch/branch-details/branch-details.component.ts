import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '../../app.component';
import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

import { Branch }                 from '../branch.model';
import { BranchService }          from '../branch.service';

/**
 * Branch's details
 * @class BranchDetailsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-branch-details',
  templateUrl:              './branch-details.component.html',
  styleUrls:                ['./branch-details.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class BranchDetailsComponent implements OnInit, OnDestroy {
  private sub:              any;
  readMode:                 boolean;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Branch;
  oldItem:                  Branch;

  /**
   * Constructor
   * @param ActivatedRoute  route
   * @param BranchService   service
   * @param MatSnackBar     snackBar
   */
  constructor(
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        BranchService,
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
   * Execute on init
   */
  public ngOnInit() {

  }

  /**
   * Execute on init
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); //copy
    }, error => {
      console.log('Erro ao pesquisar filial', error);
      this.material.snackBar('Erro ao pesquisar filial. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Open dialog to confirm delete
   * @param Branch item
   */
  public deleteConfirm(item: Branch) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa filial?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
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
      this.material.snackBar('Filial excluída.', 'OK');
      this.goBack();
    }, error => {
      console.log('Erro ao excluir filial', error);
      this.material.snackBar('Erro ao excluir filial. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Go to latest route
   */
  public goBack() {
    this.location.back();
  }
}
