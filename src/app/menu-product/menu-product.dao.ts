import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '../app.config';
import { Presenter }                from '../common/model/presenter.model';
import { QueryInput }               from '../common/model/query-input.model';

import { MenuProduct }              from './menu-product.model';

/**
 * @class MenuProductDao
 */
@Injectable()
export class MenuProductDao {
  private path: string;

  /**
   * Constructor
   * @param HttpClient http
   */
  constructor(private http: HttpClient) {
    this.path = AppConfig.BASE_URL + '/api/company/' + AppConfig.COMPANY_ID + '/menu-product/';
  }

  /**
   * Display a listing of resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<MenuProduct>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   * Display details of resource on database
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<MenuProduct>> {
    return this.http.get(this.path + id, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param MenuProduct item
   */
  public save(item: MenuProduct): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param MenuProduct item
   * @param number id
   */
  public update(item: MenuProduct, id: number): Observable<any> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public deleteByCompany(company_id: number): Observable<any> {
    return this.http.delete(this.path);
  }


  // BY MENU SECTION -----------------------------------------
  /**
   * Display a listing of resource by menu
   * @param QueryInput queryInput
   */
  public queryByMenu(id: number, queryInput: QueryInput): Observable<Presenter<Array<MenuProduct>>> {
    const path = this.path + 'menu/';
    return this.http.get(path, {params: <HttpParams> queryInput});
  }

  /**
   * Delete resource by menu on database
   * @param number id
   */
  public deleteByMenu(menu_id: number): Observable<any> {
    const path = this.path + 'menu/';
    return this.http.delete(path + menu_id);
  }
}
