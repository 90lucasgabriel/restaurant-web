import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { OrderStatus }              from '@r-order-status/order-status.model';

/**
 * @export
 * @class OrderStatusDao
 */
@Injectable()
export class OrderStatusDao {
  private path: string;

  /**
   * Creates an instance of OrderStatusDao.
   * @param {HttpClient} http
   * @memberof OrderStatusDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/order-status`;
  }

  /**
   * Returns a list of the resource.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderStatus>>>}
   * @memberof OrderStatusDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderStatus>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<OrderStatus>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param OrderStatus item
   */
  public save(item: OrderStatus): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param OrderStatus item
   * @param number id
   */
  public update(item: OrderStatus, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
