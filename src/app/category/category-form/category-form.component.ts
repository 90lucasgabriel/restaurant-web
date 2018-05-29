import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { LoaderService }          from '@r-service/loader.service';
import { MaterialService }        from '@r-material/material.service';
import { QueryInput }             from '@r-model/query-input.model';
import { ANIMATION }              from '@r-material/material-animation';

import { Category }               from '@r-category/category.model';
import { CategoryService }        from '@r-category/category.service';

/**
 * CategoryFormComponent
 * @export
 * @class CategoryFormComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector:           'app-category-form',
  templateUrl:        './category-form.component.html',
  styleUrls:          ['./category-form.component.css'],
  encapsulation:      ViewEncapsulation.None,
  animations:         [ ANIMATION ]
})
export class CategoryFormComponent implements OnInit, OnDestroy {
// DECLARATIONS --------------------------
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Category        = new Category();
  oldItem:                  Category;
  items:                    Array<Category> = new Array<Category>();
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;

  imagePreview = '';




// MAIN ----------------------------------
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
      }  else {
        this.company_id      = +params['company_id'];
        this.item.company_id = +params['company_id'];
        this.setNewItem(true);
      }
    });
  }

  /**
   * Determine if is new item or edit item
   * @param {boolean} value
   * @memberof CategoryFormComponent
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode = true;
      this.title       = 'Nova Categoria';
    } else {
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
      this.oldItem = JSON.parse(JSON.stringify(this.item)); // copy
    });
  }

  /**
   * Submit data to create or update
   * @param {Category} item
   * @memberof CategoryFormComponent
   */
  public submitForm(item: Category) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    } else {
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

  /**
   * List all categories.
   */
  public queryAll() {
    this.service.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.items = data.data;
    });
  }

  /**
   * Get image file and set on variable.
   * @param event
   */
  public previewImage(event) {
    this.item.image = event.srcElement.files[0].name;
  }




// OTHERS --------------------------------
  /**
   * Creates an instance of CategoryFormComponent.
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Location} location
   * @param {CategoryService} service
   * @param {MaterialService} material
   * @param {LoaderService} loader
   * @memberof CategoryFormComponent
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
