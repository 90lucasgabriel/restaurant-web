import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { OrderStatus } 			        from '@r-order-status/order-status.model';
import { OrderStatusDao } 	        from '@r-order-status/order-status.dao';

@Injectable()
export class OrderStatusService {
  item:  OrderStatus;
  items: Array<OrderStatus>;

  /**
   * Creates an instance of OrderStatusService.
   * @param {OrderStatusDao} dao
   * @memberof OrderStatusService
   */
  constructor(private dao: OrderStatusDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderStatus>>>}
   * @memberof OrderStatusService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderStatus>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<OrderStatus>>}
   * @memberof OrderStatusService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<OrderStatus>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {OrderStatus} item
   * @returns {Observable<Presenter<OrderStatus>>}
   * @memberof OrderStatusService
   */
  public save(item: OrderStatus): Observable<Presenter<OrderStatus>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {OrderStatus} item
   * @param {number} id
   * @returns {Observable<Presenter<OrderStatus>>}
   * @memberof OrderStatusService
   */
  public update(item: OrderStatus, id: number): Observable<Presenter<OrderStatus>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderStatusService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of product
   * @param {Array<OrderStatus>} list
   * @param {string} value
   * @returns {Array<OrderStatus>}
   * @memberof OrderStatusService
   */
  public filter(list: Array<OrderStatus>, value: string): Array<OrderStatus> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value ||
        item.name.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
      );
    }

    return list;
  }
}
