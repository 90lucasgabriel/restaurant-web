import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { OrderDetail } 			        from '@r-order-detail/order-detail.model';
import { OrderDetailDao } 	        from '@r-order-detail/order-detail.dao';

@Injectable()
export class OrderDetailService {
  item:  OrderDetail;
  items: Array<OrderDetail>;

  /**
   * Creates an instance of OrderDetailService.
   * @param {OrderDetailDao} dao
   * @memberof OrderDetailService
   */
  constructor(private dao: OrderDetailDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderDetail>>>}
   * @memberof OrderDetailService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderDetail>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns a resource list by Branch.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderDetail>>>} 
   * @memberof OrderDetailService
   */
  public queryByBranch(queryInput: QueryInput): Observable<Presenter<Array<OrderDetail>>> {
    return this.dao.queryByBranch(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<OrderDetail>>}
   * @memberof OrderDetailService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<OrderDetail>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {OrderDetail} item
   * @returns {Observable<Presenter<OrderDetail>>}
   * @memberof OrderDetailService
   */
  public save(item: OrderDetail): Observable<Presenter<OrderDetail>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {OrderDetail} item
   * @param {number} id
   * @returns {Observable<Presenter<OrderDetail>>}
   * @memberof OrderDetailService
   */
  public update(item: OrderDetail, id: number): Observable<Presenter<OrderDetail>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderDetailService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of order-detail
   * @param {Array<OrderDetail>} list
   * @param {string} value
   * @returns {Array<OrderDetail>}
   * @memberof OrderDetailService
   */
  public filter(list: Array<OrderDetail>, value: string): Array<OrderDetail> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value
      );
    }

    return list;
  }
}
