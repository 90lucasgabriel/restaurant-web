import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Product }                  from '@r-product/product.model';
import { Branch }                   from '@r-branch/branch.model';

import { Menu } 			              from '@r-menu/menu.model';
import { MenuDao } 	                from '@r-menu/menu.dao';

@Injectable()
export class MenuService {
  item:  Menu;
  items: Array<Menu>;

  /**
   * Creates an instance of MenuService.
   * @param {MenuDao} dao
   * @memberof MenuService
   */
  constructor(private dao: MenuDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Menu>>>}
   * @memberof MenuService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Menu>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Menu>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Save resource.
   * @param {Menu} item
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuService
   */
  public save(item: Menu): Observable<Presenter<Menu>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Menu} item
   * @param {number} id
   * @returns {Observable<Presenter<Menu>>}
   * @memberof MenuService
   */
  public update(item: Menu, id: number): Observable<Presenter<Menu>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof MenuService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }




  // TIME SECTION -------------------------------
  /**
   * Delete old menuTime list and save new menuTime list.
   * @param {Array<any>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<any>>}
   * @memberof MenuService
   */
  public syncTime(items: Array<any>, menu_id: number): Observable<Presenter<any>> {
    return this.dao.syncTime(items, menu_id);
  }



  // PRODUCT SECTION -------------------------------
  /**
   * Delete old product list and save new product list.
   * @param {Array<Product>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<Product>>}
   * @memberof MenuService
   */
  public syncProduct(items: Array<Product>, menu_id: number): Observable<Presenter<Product>> {
    return this.dao.syncProduct(items, menu_id);
  }




  // BRANCH SECTION -------------------------------
  /**
   * Delete old branch list and save new branch list.
   * @param {Array<Branch>} items
   * @param {number} menu_id
   * @returns {Observable<Presenter<Branch>>}
   * @memberof MenuService
   */
  public syncBranch(items: Array<Branch>, menu_id: number): Observable<Presenter<Branch>> {
    return this.dao.syncBranch(items, menu_id);
  }
}
