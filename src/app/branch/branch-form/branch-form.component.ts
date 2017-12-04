import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

import { Branch }                 from '../branch.model';
import { BranchService }          from '../branch.service';

@Component({
  selector:                 'app-branch-form',
  templateUrl:              './branch-form.component.html',
  styleUrls:                ['./branch-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class BranchFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Branch = {};
  oldItem:                  Branch;
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;

  /**
   * Constructor
   * @param Router          router
   * @param ActivatedRoute  route
   * @param Location        location
   * @param BranchService   service
   * @param MaterialService material
   */
  constructor(
    private router:         Router,
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
    this.submitted   = false;
    this.newItemMode = true;

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.get(+params['id']);
      }
      else {
        this.company_id      = +params['company_id'];
        this.item.company_id = +params['company_id'];
        this.setNewItem(true);
      }
    });
  }

  /**
   * Execute on init
   */
  public ngOnInit() {

  }

  /**
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Nova Filial';
    }
    else {
      this.newItemMode = false;
      this.title       = 'Editar Filial';
    }
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id).subscribe(success => {
      this.setNewItem(false);
      this.item    = success.data;
      this.oldItem = JSON.parse(JSON.stringify(this.item)); //copy
    });
  }

  /**
   * Submit data to create or update
   * @param Branch item
   */
  public submitForm(item: Branch) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    }
    else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param Branch item
   */
  public save(item: Branch) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Nova filial criada', 'OK');
    }, error => {
      console.log('Erro ao criar filial', error);
      this.material.snackBar('Erro ao criar filial. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Send update request
   * @param Branch item
   * @param number id
   */
  public update(item: Branch, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Filial atualizada', 'OK');
    }, error => {
      console.log('Erro ao atualizar filial', error);
      this.material.snackBar('Erro ao atualizar filial. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Cancel form and read mode
   */
  public cancelForm(): void {
    this.goBack();
  }

  /**
   * Execute on destroy
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Go to latest route
   */
  public goBack() {
    this.location.back();
  }
}
