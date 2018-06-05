import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { OrderItem }                from '@r-order-item/order-item.model';

/**
 * @export
 * @class OrderItemDao
 */
@Injectable()
export class OrderItemDao {
  private path: string;

  /**
   * Creates an instance of OrderItemDao.
   * @param {HttpClient} http
   * @memberof OrderItemDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order-item`;
  }

  /**
   * Returns a list of the resource.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItem>>>}
   * @memberof OrderItemDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItem>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<OrderItem>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param OrderItem item
   */
  public save(item: OrderItem): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update items of resource on database
   * @param OrderItem item
   * @param number id
   */
  public update(item: OrderItem, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }

  public queryByBranch(queryInput: QueryInput): Observable<Presenter<Array<OrderItem>>> {
    const path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order-item`;
    return this.http.get(path, {params: <HttpParams> queryInput});
  }
}
