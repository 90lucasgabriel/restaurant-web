import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { Product }                  from '../product/product.model';
import { Branch }                   from '../branch/branch.model';

import { Menu } 			              from './menu.model';
import { MenuDao } 	                from './menu.dao';

@Injectable()
export class MenuService {
  item:  Menu;
  items: Array<Menu>;

  /**
   * Constructor
   *
   * @param MenuDao dao
   */
  constructor(private dao: MenuDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<Menu>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Menu>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<Menu>>
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Menu>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Save resource.
   *
   * @param Menu item
   * @return Observable<Presenter<Menu>>
   */
  public save(item: Menu): Observable<Presenter<Menu>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param Menu item
   * @param number id
   * @return Observable<Presenter<Menu>>
   */
  public update(item: Menu, id: number): Observable<Presenter<Menu>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param number id
   * @return boolean
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }




  // PRODUCT SECTION -------------------------------
  /**
   * Delete old product list and save new product list.
   * @param items Array<Product>
   * @param menu_id number
   * @return Observable<Presenter<Product>>
   */
  public syncProduct(items: Array<Product>, menu_id: number): Observable<Presenter<Product>> {
    return this.dao.syncProduct(items, menu_id);
  }

  /**
   * Query product list.
   * @param menu_id number
   * @return Observable<Presenter<Array<Product>>>
   */
  public queryProduct(menu_id: number): Observable<Presenter<Array<Product>>> {
    return this.dao.queryProduct(menu_id);
  }





  // BRANCH SECTION -------------------------------
  /**
   * Delete old branch list and save new branch list.
   * @param items Array<Branch>
   * @param menu_id number
   * @return Observable<Presenter<Branch>>
   */
  public syncBranch(items: Array<Branch>, menu_id: number): Observable<Presenter<Branch>> {
    return this.dao.syncBranch(items, menu_id);
  }

  /**
   * Query branch list.
   * @param menu_id number
   * @return Observable<Presenter<Array<Branch>>>
   */
  public queryBranch(menu_id: number): Observable<Presenter<Array<Branch>>> {
    return this.dao.queryBranch(menu_id);
  }
}
