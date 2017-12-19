import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '../app.config';
import { Presenter }                from '../common/model/presenter.model';
import { QueryInput }               from '../common/model/query-input.model';

import { Menu }                     from './menu.model';
import { Branch }                   from '../branch/branch.model';
import { Product }                  from '../product/product.model';

/**
 * @class MenuDao
 */
@Injectable()
export class MenuDao {
  private path: string;

  /**
   * Constructor
   * @param HttpClient http
   */
  constructor(private http: HttpClient) {
    this.path = AppConfig.BASE_URL + '/api/company/' + AppConfig.COMPANY_ID + '/menu/';
  }

  /**
   * Display a listing of resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Menu>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   * Display details of resource on database
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<Menu>> {
    return this.http.get(this.path + id, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param Menu item
   */
  public save(item: Menu): Observable<Presenter<Menu>> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param Menu item
   * @param number id
   */
  public update(item: Menu, id: number): Observable<Presenter<Menu>> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }




  // TIME SECTION --------------------------------
  /**
   * Delete old product list and save new product list.
   * @param items Array<Product>
   * @param menu_id number
   * @return Observable<any>
   */
  public syncTime(items: Array<any>, menu_id: number): Observable<Presenter<any>> {
    const path = this.path + menu_id + '/time';
    return this.http.post(path, {'time': items});
  }




  // PRODUCT SECTION --------------------------------
  /**
   * Delete old product list and save new product list.
   * @param items Array<Product>
   * @param menu_id number
   * @return Observable<any>
   */
  public syncProduct(items: Array<Product>, menu_id: number): Observable<Presenter<Product>> {
    const path = this.path + menu_id + '/product';
    return this.http.post(path, {'product': items});
  }

  /**
   * Query product list.
   * @param menu_id number
   * @return Observable<Presenter<Product>>
   */
  public queryProduct(menu_id: number): Observable<Presenter<Array<Product>>> {
    const path = this.path + menu_id + '/product';
    return this.http.get(path);
  }




  // BRANCH SECTION --------------------------------
  /**
   * Delete old branch list and save new branch list.
   * @param items Array<Branch>
   * @param menu_id number
   * @return Observable<any>
   */
  public syncBranch(items: Array<Branch>, menu_id: number): Observable<Presenter<Branch>> {
    const path = this.path + menu_id + '/branch';
    return this.http.post(path, {'branch': items});
  }

  /**
   * Query branch list.
   * @param menu_id number
   * @return Observable<Presenter<Branch>>
   */
  public queryBranch(menu_id: number): Observable<Presenter<Array<Branch>>> {
    const path = this.path + menu_id + '/branch';
    return this.http.get(path);
  }
}
