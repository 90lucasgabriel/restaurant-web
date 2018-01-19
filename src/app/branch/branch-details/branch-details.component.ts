import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AppComponent }           from '@r-app/app.component';
import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';

import { Branch }                 from '@r-branch/branch.model';
import { BranchService }          from '@r-branch/branch.service';

/**
 * Branch's details
 * @export
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
// DECLARATIONS --------------------------
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;
  item:                     Branch;
  oldItem:                  Branch;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.submitted = false;
    this.sub = this.route.params.subscribe(params => {
      this.get(+params['id']);
    });
  }

  /**
   * Show item details
   * @param {number} id
   * @memberof BranchDetailsComponent
   */
  public get(id: number) {
    this.service.get(id).subscribe(success => {
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
    }, error => {
      this.material.error('Erro ao pesquisar filial.', error);
    });
  }

  /**
   * Open dialog to confirm delete
   * @param {Branch} item
   * @memberof BranchDetailsComponent
   */
  public deleteConfirm(item: Branch) {
    this.material.openDialog(item, 'Excluir', 'Deseja excluir essa filial?', 'CANCELAR', 'EXCLUIR').subscribe(data => {
      if (data) {
        this.delete(item.id);
      }
    });
  }

  /**
   * Delete resource
   * @param {number} id
   * @memberof BranchDetailsComponent
   */
  public delete(id: number) {
    this.submitted = true;
    this.service.delete(id).subscribe(data => {
      this.material.snackBar('Filial excluída.', 'OK');
      this.goBack();
    }, error => {
      this.material.error('Erro ao excluir filial.', error);
    });
  }




// OTHERS --------------------------------
  /**
   * Creates an instance of BranchDetailsComponent.
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {BranchService} service
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @memberof BranchDetailsComponent
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
   * Execute on init
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
