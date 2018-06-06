import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { OrderItemStatus }          from '@r-order-item-status/order-item-status.model';

/**
 * @export
 * @class OrderItemStatusDao
 */
@Injectable()
export class OrderItemStatusDao {
  private path: string;

  /**
   * Creates an instance of OrderItemStatusDao.
   * @param {HttpClient} http
   * @memberof OrderItemStatusDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/order-item-status`;
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItemStatus>>>}
   * @memberof OrderItemStatusDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItemStatus>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<OrderItemStatus>>}
   * @memberof OrderItemStatusDao
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<OrderItemStatus>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database.
   * @param {OrderItemStatus} item
   * @returns {Observable<any>}
   * @memberof OrderItemStatusDao
   */
  public save(item: OrderItemStatus): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param {OrderItemStatus} item
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemStatusDao
   */
  public update(item: OrderItemStatus, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemStatusDao
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
