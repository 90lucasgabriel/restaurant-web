import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { OrderItemType } 			      from '@r-order-item-type/order-item-type.model';
import { OrderItemTypeDao } 	      from '@r-order-item-type/order-item-type.dao';

@Injectable()
export class OrderItemTypeService {
  item:  OrderItemType;
  items: Array<OrderItemType>;

  /**
   * Creates an instance of OrderItemTypeService.
   * @param {OrderItemTypeDao} dao
   * @memberof OrderItemTypeService
   */
  constructor(private dao: OrderItemTypeDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItemType>>>}
   * @memberof OrderItemTypeService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItemType>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<OrderItemType>>}
   * @memberof OrderItemTypeService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<OrderItemType>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   * @param {OrderItemType} item
   * @returns {Observable<Presenter<OrderItemType>>}
   * @memberof OrderItemTypeService
   */
  public save(item: OrderItemType): Observable<Presenter<OrderItemType>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {OrderItemType} item
   * @param {number} id
   * @returns {Observable<Presenter<OrderItemType>>}
   * @memberof OrderItemTypeService
   */
  public update(item: OrderItemType, id: number): Observable<Presenter<OrderItemType>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemTypeService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }
}
