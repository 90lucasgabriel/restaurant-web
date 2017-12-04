import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { MenuProduct } 			        from './menu-product.model';
import { MenuProductDao } 	        from './menu-product.dao';

@Injectable()
export class MenuProductService {
  item:  MenuProduct;
  items: Array<MenuProduct>;

  /**
   * Constructor
   *
   * @param MenuProductDao dao
   */
  constructor(private dao: MenuProductDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<MenuProduct>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<MenuProduct>>>{
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<MenuProduct>>
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<MenuProduct>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   *
   * @param MenuProduct item
   * @return Observable<Presenter<MenuProduct>>
   */
  public save(item: MenuProduct): Observable<Presenter<MenuProduct>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param MenuProduct item
   * @param number id
   * @return Observable<Presenter<MenuProduct>>
   */
  public update(item: MenuProduct, id: number): Observable<Presenter<MenuProduct>> {
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

  /**
   * Delete resource by Company.
   * @param number company_id
   * @return boolean
   */
  public deleteByCompany(company_id: number): Observable<any> {
    return this.dao.deleteByCompany(company_id);
  }

  /**
   * Delete resource by Menu.
   * @param number menu_id
   * @return boolean
   */
  public deleteByMenu(menu_id: number): Observable<any> {
    return this.dao.deleteByMenu(menu_id);
  }
}
