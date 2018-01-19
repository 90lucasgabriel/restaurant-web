import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Product } 			            from '@r-product/product.model';
import { ProductDao } 	            from '@r-product/product.dao';

@Injectable()
export class ProductService {
  item:  Product;
  items: Array<Product>;

  /**
   * Creates an instance of ProductService.
   * @param {ProductDao} dao
   * @memberof ProductService
   */
  constructor(private dao: ProductDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Product>>>}
   * @memberof ProductService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Product>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<Product>>}
   * @memberof ProductService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Product>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {Product} item
   * @returns {Observable<Presenter<Product>>}
   * @memberof ProductService
   */
  public save(item: Product): Observable<Presenter<Product>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Product} item
   * @param {number} id
   * @returns {Observable<Presenter<Product>>}
   * @memberof ProductService
   */
  public update(item: Product, id: number): Observable<Presenter<Product>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof ProductService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of product
   * @param {Array<Product>} list
   * @param {string} value
   * @returns {Array<Product>}
   * @memberof ProductService
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
