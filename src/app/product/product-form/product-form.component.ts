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
import { Product }                from '@r-product/product.model';
import { ProductService }         from '@r-product/product.service';

@Component({
  selector:           'app-product-form',
  templateUrl:        './product-form.component.html',
  styleUrls:          ['./product-form.component.css'],
  encapsulation:      ViewEncapsulation.None,
  animations:         [ ANIMATION ]
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  loading:                  boolean;
  submitted:                boolean;

  item:                     Product = new Product();
  oldItem:                  Product;
  items:                    Array<Product> = new Array<Product>();
  company_id:               number;

  newItemMode:              boolean;
  title:                    string;

  imagePreview = '';

  categoryList: Array<Category>;

  /**
   * Constructor
   * @param Router          router
   * @param ActivatedRoute  route
   * @param Location        location
   * @param ProductService   service
   * @param MaterialService material
   */
  constructor(
    private router:           Router,
    private route:            ActivatedRoute,
    private location:         Location,
    public  material:         MaterialService,
    public  loader:           LoaderService,
    private service:          ProductService,
    private categoryService:  CategoryService,
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

    this.queryCategory();

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.get(+params['id']);
      } else {
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
      this.title       = 'Novo Produto';
    } else {
      this.newItemMode = false;
      this.title       = 'Editar Produto';
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
   * @param Product item
   */
  public submitForm(item: Product) {
    this.submitted = true;
    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.oldItem.id);
    }
  }

  /**
   * Send request to save
   * @param Product item
   */
  public save(item: Product) {
    this.service.save(item).subscribe(success => {
      this.goBack();
      this.material.snackBar('Novo produto criado', 'OK');
    }, error => {
      console.log('Erro ao criar produto', error);
      this.material.snackBar('Erro ao criar produto. Detalhes no console (F12).', 'OK');
    });
  }

  /**
   * Send update request
   * @param Product item
   * @param number id
   */
  public update(item: Product, id: number) {
    this.service.update(item, id).subscribe(success => {
      this.goBack();
      this.material.snackBar('Produto atualizado', 'OK');
    }, error => {
      console.log('Erro ao atualizar produto', error);
      this.material.snackBar('Erro ao atualizar produto. Detalhes no console (F12).', 'OK');
    });
  }

  public queryCategory() {
    this.categoryService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.categoryList = data.data;
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
