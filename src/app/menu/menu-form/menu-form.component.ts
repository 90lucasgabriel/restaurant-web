import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy,  Inject } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { LoaderService }          from '../../loader.service';
import { MaterialService }        from '../../material/material.service';
import { QueryInput }             from '../../common/model/query-input.model';

import { Product }                from '../../product/product.model';
import { ProductService }         from '../../product/product.service';
import { Branch }                 from '../../branch/branch.model';
import { BranchService }          from '../../branch/branch.service';
import { Menu }                   from '../menu.model';
import { MenuService }            from '../menu.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';


@Component({
  selector:                 'app-menu-form',
  templateUrl:              './menu-form.component.html',
  styleUrls:                ['./menu-form.component.css'],
  encapsulation:            ViewEncapsulation.None
})
export class MenuFormComponent implements OnInit, OnDestroy {
  private sub:              any;
  submitted:                boolean;
  loading = {
    get:      true,
    product:  true,
    branch:   true,
  };

  item:                     Menu        = new Menu();
  items:                    Array<Menu> = new Array<Menu>();
  company_id:               number;
  menu_id:                  number;

  newItemMode:              boolean;
  title:                    string;
  message:                  string;

  productList:              Array<Product> = new Array<Product>();
  productListCopy:          Array<Product> = new Array<Product>();
  productListChecked:       Array<Product> = new Array<Product>();
  // productCheckedAll:        boolean = false;
  // productIndeterminate:     boolean = false;
  branchList:               Array<Branch>;
  branchListCopy:           Array<Branch>;
  branchListChecked:        Array<Branch>;
  // branchCheckedAll:         boolean = false;
  // branchIndeterminate:      boolean = false;

  imagePreview = '';

  /**
   * Constructor
   * @param Router          router
   * @param ActivatedRoute  route
   * @param Location        location
   * @param MenuService     service
   * @param MaterialService material
   */
  constructor(
    private router:             Router,
    private route:              ActivatedRoute,
    private location:           Location,
    public  material:           MaterialService,
    public  loader:             LoaderService,
    private service:            MenuService,
    private productService:     ProductService,
    private branchService:      BranchService,
  ) {
    loader.onLoadingChanged.subscribe(isLoading => {
      this.loading.get = isLoading;
    });
    this.start();
  }

  /**
   * Execute before onInit
   */
  public start() {
    this.submitted = false;
    this.newItemMode       = true;

    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.setNewItem(false);
        this.get(+params['id']);
        this.menu_id = +params['id'];
      } else {
        this.setNewItem(true);
      }
      this.company_id      = +params['company_id'];
    });

    this.queryProduct();
    this.queryBranch();
  }

  /**
   * Determine if is new item or edit item
   * @param boolean value
   */
  public setNewItem(value: boolean) {
    if (value) {
      this.newItemMode     = true;
      this.title           = 'Novo Cardápio';
      this.message         = 'Novo cardápio criado';
    } else {
      this.newItemMode     = false;
      this.title           = 'Editar Cardápio';
      this.message         = 'Cardápio atualizado';
    }
  }

  /**
   * Show item details
   * @param number id
   */
  public get(id: number) {
    this.service.get(id, {'include': 'parent'}).subscribe(success => {
      this.item        = success.data;
      this.loading.get = false;
      this.submitted   = true;
    }, error => {
      this.goBack();
      this.material.error('Cardápio não encontrado', error);
    });
  }

  /**
   * Submit data to create or update
   * @param Menu item
   */
  public submitForm(item: Menu) {
    this.submitted = true;
    this.productFilter('');
    this.branchFilter('');

    this.item.company_id    = this.company_id;
    this.productListChecked = this.productList.filter(product => product.checked);
    this.branchListChecked  = this.branchList.filter(branch => branch.checked);

    if (this.newItemMode) {
      this.save(item);
    } else {
      this.update(item, this.menu_id);
    }
  }

  /**
   * Send request to save
   * @param Menu item
   */
  public save(item: Menu) {
    Observable.of(this.service.save(item))
    .switchMap(() => this.service.save(item))
      .map(menu => this.menu_id = menu.data.id)
    .switchMap(() => this.service.syncProduct(this.productListChecked, this.menu_id ))
    .switchMap(() => this.service.syncBranch(this.branchListChecked, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });
  }

  /**
   * Send update request
   * @param Menu item
   * @param number id
   */
  public update(item: Menu, id: number) {
    Observable.of(this.service.update(item, id))
    .switchMap(menu     => this.service.update(item, id))
    .switchMap(products => this.service.syncProduct(this.productListChecked, this.menu_id))
    .switchMap(branches => this.service.syncBranch(this.branchListChecked, this.menu_id))
    .subscribe(success  => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar cardápio', error);
    });
  }




  // PRODUCT SECTION --------------------
  /**
   * List all products of this company
   */
  public queryProduct() {
    this.productService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.productList     = data.data;
      this.productListCopy = data.data;
      if (!this.newItemMode) {
        this.queryMenuProduct();
      } else {
        this.loading.product = false;
      }
    });
  }

  /**
   * List all menuProducts of this menu
   */
  public queryMenuProduct() {
    this.service.queryProduct(this.menu_id).subscribe(data => {
      for (const p of data.data) {
        this.productList.find(product => product.id === p.id).checked = true;
        this.productList.find(product => product.id === p.id).price   = p.pivot.price;
      }

      this.loading.product = false;
    });
  }

  /**
   * Filter an array of products with value inserted
   * @param string value
   */
  public productFilter(value: string) {
    this.productList  = this.productListCopy; // reset array
    this.productList  = this.productService.filter(this.productList, value);
  }

  /**
   * Delete and save news products on menu
   */
  public syncProduct() {
    const productListChecked = this.productList.filter(product => product.checked);

    this.service.syncProduct(productListChecked, this.menu_id).subscribe(success => {
      // this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar produtos', error);
    });
  }

  // /**
  //  * Check all products
  //  */
  // public productIsCheckedAll() {
  //   for (const product of this.productList) {
  //     product.checked = this.productCheckedAll;
  //   }
  // }

  // public verifyProductChecked() {
  //   for (const item of this.menuProductList) {
  //     this.productList.find( product => product.id === item.product_id);
  //   }
  // }





  // BRANCH SECTION --------------------------
   /**
   * List all products of this company
   */
  public queryBranch() {
    this.branchService.query({
      'orderBy':      'id',
      'sortedBy':     'asc'
    }).subscribe(data => {
      this.branchList     = data.data;
      this.branchListCopy = data.data;

      if (!this.newItemMode) {
        this.queryMenuBranch();
      } else {
        this.loading.branch = false;
      }
    });
  }

  /**
   * List all menuBranchs of this menu
   */
  public queryMenuBranch() {
    this.service.queryBranch(this.menu_id).subscribe(data => {
      for (const p of data.data) {
        this.branchList.find(branch => branch.id === p.id).checked = true;
      }
      this.loading.branch = false;
    });
  }

  /**
   * Filter an array of branchs with value inserted
   * @param string value
   */
  public branchFilter(value: string) {
    this.branchList  = this.branchListCopy; // reset array
    this.branchList  = this.branchService.filter(this.branchList, value);
  }

  /**
   * Delete and save news branchs on menu
   */
  public syncBranch() {
    const branchListChecked = this.branchList.filter(branch => branch.checked);

    this.service.syncBranch(branchListChecked, this.menu_id).subscribe(success => {
      this.accomplished();
    }, error => {
      this.material.error('Erro ao atualizar produtos', error);
    });
  }

  // /**
  //  * Check all branchs
  //  */
  // public branchIsCheckedAll() {
  //   for (const branch of this.branchList) {
  //     branch.checked = this.branchCheckedAll;
  //   }
  // }

  // public verifyBranchChecked() {
  //   for (const item of this.menuBranchList) {
  //     this.branchList.find( branch => branch.id === item.branch_id);
  //   }
  // }



  // OTHERS SECTION ---------------------------

  public accomplished() {
    this.goBack();
    this.material.snackBar(this.message, 'OK');
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
  public ngOnInit() { }

  /**
   * Execute on destroy
   */
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
