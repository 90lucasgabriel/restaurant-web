import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

import { Category }               from '../category.model';
import { CategoryService }        from '../category.service';

@Component({
  selector:                 'app-category-form',
  templateUrl:              './category-form.component.html',
  styleUrls:                ['./category-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Category = new Category();
  oldItem:                  Category;
  items: Array<Category> = new Array<Category>();
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;

  imagePreview = '';

  /**
   * Constructor
   * @param Router          router
   * @param ActivatedRoute  route
   * @param Location        location
   * @param CategoryService service
   * @param MaterialService material
   */
  constructor(
    private router:         Router,
    private route:          ActivatedRoute,
    private location:       Location,
    private service:        CategoryService,
    public  material:       MaterialService,
    public  loader:         LoaderService
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

    this.queryAll();

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
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Nova Categoria';
    }
    else {
      this.newItemMode = false;
      this.title       = 'Editar Categoria';
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
      this.oldItem = JSON.parse(JSON.stringify(this.item)); //copy
    });
  }

  /**
   * Submit data to create or update
   * @param Category item
   */
  public submitForm(item: Category) {
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
   * @param Category item
   */
  public save(item: Category) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Nova categoria criada', 'OK');
    }, error => {
      console.log('Erro ao criar categoria', error);
      this.material.snackBar('Erro ao criar categoria. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Send update request
   * @param Category item
   * @param number id
   */
  public update(item: Category, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Filial atualizada', 'OK');
    }, error => {
      console.log('Erro ao atualizar categoria', error);
      this.material.snackBar('Erro ao atualizar categoria. Detalhes no console (F12).', 'OK');
    });
  }

  public queryAll() {
    this.service.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.items = data.data;
    });
  }


  public previewImage(event) {
    this.item.image = event.srcElement.files[0].name;
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
