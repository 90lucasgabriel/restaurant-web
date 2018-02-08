import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Order } 			              from '@r-order/order.model';
import { OrderDao } 	              from '@r-order/order.dao';

@Injectable()
export class OrderService {
  item:  Order;
  items: Array<Order>;

  /**
   * Creates an instance of OrderService.
   * @param {OrderDao} dao
   * @memberof OrderService
   */
  constructor(private dao: OrderDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Order>>>}
   * @memberof OrderService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Order>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<Order>>}
   * @memberof OrderService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Order>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {Order} item
   * @returns {Observable<Presenter<Order>>}
   * @memberof OrderService
   */
  public save(item: Order): Observable<Presenter<Order>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Order} item
   * @param {number} id
   * @returns {Observable<Presenter<Order>>}
   * @memberof OrderService
   */
  public update(item: Order, id: number): Observable<Presenter<Order>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of order
   * @param {Array<Order>} list
   * @param {string} value
   * @returns {Array<Order>}
   * @memberof OrderService
   */
  public filter(list: Array<Order>, value: string): Array<Order> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value
      );
    }

    return list;
  }
}
