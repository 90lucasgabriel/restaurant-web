import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { OrderItemStatus } 			    from '@r-order-item-status/order-item-status.model';
import { OrderItemStatusDao } 	    from '@r-order-item-status/order-item-status.dao';

@Injectable()
export class OrderItemStatusService {
  item:  OrderItemStatus;
  items: Array<OrderItemStatus>;

  /**
   * Creates an instance of OrderItemStatusService.
   * @param {OrderItemStatusDao} dao
   * @memberof OrderItemStatusService
   */
  constructor(private dao: OrderItemStatusDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItemStatus>>>}
   * @memberof OrderItemStatusService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItemStatus>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<OrderItemStatus>>}
   * @memberof OrderItemStatusService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<OrderItemStatus>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   * @param {OrderItemStatus} item
   * @returns {Observable<Presenter<OrderItemStatus>>}
   * @memberof OrderItemStatusService
   */
  public save(item: OrderItemStatus): Observable<Presenter<OrderItemStatus>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {OrderItemStatus} item
   * @param {number} id
   * @returns {Observable<Presenter<OrderItemStatus>>}
   * @memberof OrderItemStatusService
   */
  public update(item: OrderItemStatus, id: number): Observable<Presenter<OrderItemStatus>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemStatusService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }
}
