import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { Product } 			            from './product.model';
import { ProductDao } 	            from './product.dao';

@Injectable()
export class ProductService {
  item:  Product;
  items: Array<Product>;

  /**
   * Constructor
   *
   * @param ProductDao dao
   */
  constructor(private dao: ProductDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<Product>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Product>>>{
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<Product>>
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Product>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   *
   * @param Product item
   * @return Observable<Presenter<Product>>
   */
  public save(item: Product): Observable<Presenter<Product>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param Product item
   * @param number id
   * @return Observable<Presenter<Product>>
   */
  public update(item: Product, id: number): Observable<Presenter<Product>> {
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
   * Filter a list of product
   * @param list 
   * @param value 
   */
  public filter(list: Array<Product>, value: string): Array<Product> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value ||
        item.name.toLowerCase().includes(value) ||
        item.category.data.name.toLowerCase().includes(value)
      );
    }

    return list;
  }
}
