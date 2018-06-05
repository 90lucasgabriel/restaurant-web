import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { OrderItem } 			          from '@r-order-item/order-item.model';
import { OrderItemDao } 	          from '@r-order-item/order-item.dao';

@Injectable()
export class OrderItemService {
  item:  OrderItem;
  items: Array<OrderItem>;

  /**
   * Creates an instance of OrderItemService.
   * @param {OrderItemDao} dao
   * @memberof OrderItemService
   */
  constructor(private dao: OrderItemDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItem>>>}
   * @memberof OrderItemService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItem>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns a resource list by Branch.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItem>>>}
   * @memberof OrderItemService
   */
  public queryByBranch(queryInput: QueryInput): Observable<Presenter<Array<OrderItem>>> {
    return this.dao.queryByBranch(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<OrderItem>>}
   * @memberof OrderItemService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<OrderItem>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {OrderItem} item
   * @returns {Observable<Presenter<OrderItem>>}
   * @memberof OrderItemService
   */
  public save(item: OrderItem): Observable<Presenter<OrderItem>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {OrderItem} item
   * @param {number} id
   * @returns {Observable<Presenter<OrderItem>>}
   * @memberof OrderItemService
   */
  public update(item: OrderItem, id: number): Observable<Presenter<OrderItem>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of order-item
   * @param {Array<OrderItem>} list
   * @param {string} value
   * @returns {Array<OrderItem>}
   * @memberof OrderItemService
   */
  public filter(list: Array<OrderItem>, value: string): Array<OrderItem> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value
      );
    }

    return list;
  }
}
