import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';
import { Location }                  from '@angular/common';

import { LoaderService }             from '@r-service/loader.service';
import { MaterialService }           from '@r-material/material.service';
import { QueryInput }                from '@r-model/query-input.model';

import { Branch }                    from '@r-branch/branch.model';
import { BranchService }             from '@r-branch/branch.service';
import { Diningtable }               from '@r-diningtable/diningtable.model';
import { DiningtableService }        from '@r-diningtable/diningtable.service';

/**
 * DiningtableFormComponent
 * @export
 * @class DiningtableFormComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:                 'app-diningtable-form',
  templateUrl:              './diningtable-form.component.html',
  styleUrls:                ['./diningtable-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class DiningtableFormComponent implements OnInit, OnDestroy {
// DECLARATIONS --------------------------
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Diningtable        = new Diningtable();
  oldItem:                  Diningtable;
  items:                    Array<Diningtable> = new Array<Diningtable>();
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;

  branchList:               Array<Branch>;




// MAIN ----------------------------------
  /**
   * Execute before onInit
   */
  public start() {
    this.submitted   = false;
    this.newItemMode = true;

    this.queryBranch();

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
   * @memberof DiningtableFormComponent
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Nova Mesa';
    } else {
      this.newItemMode = false;
      this.title       = 'Editar Mesa';
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
   * @param {Diningtable} item
   * @memberof DiningtableFormComponent
   */
  public submitForm(item: Diningtable) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param Diningtable item
   */
  public save(item: Diningtable) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Novo status de pedido criado', 'OK');
    }, error => {
      this.material.error('Erro ao criar status de pedido', error);
    });
  }

  /**
   * Send update request
   * @param Diningtable item
   * @param number id
   */
  public update(item: Diningtable, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Status de pedido atualizado', 'OK');
    }, error => {
      this.material.error('Erro ao atualizar status de pedido', error);
    });
  }




// BRANCH SECTION -------------------------
  /**
   * List all branch.
   */
  public queryBranch() {
    this.branchService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.branchList = data.data;
    });
  }





// OTHERS --------------------------------
  /**
   * Creates an instance of DiningtableFormComponent.
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {DiningtableService} service
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @memberof DiningtableFormComponent
   */
  constructor(
    private router:         Router,
    private route:          ActivatedRoute,
    private location:       Location,
    public  material:       MaterialService,
    public  loader:         LoaderService,
    private service:        DiningtableService,
    private branchService:  BranchService,
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
