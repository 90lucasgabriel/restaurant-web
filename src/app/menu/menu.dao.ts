import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }  from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Menu }                     from '@r-menu/menu.model';
import { Branch }                   from '@r-branch/branch.model';
import { Product }                  from '@r-product/product.model';

/**
 * @class MenuDao
 */
@Injectable()
export class MenuDao {
  private path: string;

  /**
   * Creates an instance of MenuDao.
   * @param {HttpClient} http
   * @memberof MenuDao
   */
  constructor(private http: HttpClient) {
    this.path = environment.apiUrl + '/api/company/' + environment.COMPANY_ID + '/menu/';
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Menu>>>}
   * @memberof MenuDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Menu>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param {number} id
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuDao
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<Menu>> {
    return this.http.get(this.path + id, {params: <HttpParams> queryInput});
  }

   /**
   * Create resource
   * @param {Menu} item
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuDao
   */
  public save(item: Menu): Observable<Presenter<Menu>> {
    return this.http.post(this.path, item);
  }

  /**
   * Update resource
   * @param {Menu} item
   * @param {number} id
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuDao
   */
  public update(item: Menu, id: number): Observable<Presenter<Menu>> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof MenuDao
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }




  // TIME SECTION --------------------------------
  /**
   * Delete old product list and save new product list.
   * @param {Array<any>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<any>>}
   * @memberof MenuDao
   */
  public syncTime(items: Array<any>, menu_id: number): Observable<Presenter<any>> {
    const path = this.path + menu_id + '/time';
    return this.http.post(path, {'time': items});
  }




  // PRODUCT SECTION --------------------------------
  /**
   * Delete old product list and save new product list.
   * @param {Array<Product>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<Product>>}
   * @memberof MenuDao
   */
  public syncProduct(items: Array<Product>, menu_id: number): Observable<Presenter<Product>> {
    const path = this.path + menu_id + '/product';
    return this.http.post(path, {'product': items});
  }




  // BRANCH SECTION --------------------------------
  /**
   * Delete old branch list and save new branch list.
   * @param {Array<Branch>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<Branch>>}
   * @memberof MenuDao
   */
  public syncBranch(items: Array<Branch>, menu_id: number): Observable<Presenter<Branch>> {
    const path = this.path + menu_id + '/branch';
    return this.http.post(path, {'branch': items});
  }
}
