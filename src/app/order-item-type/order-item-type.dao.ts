import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { OrderItemType }            from '@r-order-item-type/order-item-type.model';

/**
 * @export
 * @class OrderItemTypeDao
 */
@Injectable()
export class OrderItemTypeDao {
  private path: string;

  /**
   * Creates an instance of OrderItemTypeDao.
   * @param {HttpClient} http
   * @memberof OrderItemTypeDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/order-item-type`;
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderItemType>>>}
   * @memberof OrderItemTypeDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderItemType>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<OrderItemType>>}
   * @memberof OrderItemTypeDao
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<OrderItemType>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database.
   * @param {OrderItemType} item
   * @returns {Observable<any>}
   * @memberof OrderItemTypeDao
   */
  public save(item: OrderItemType): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param {OrderItemType} item
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemTypeDao
   */
  public update(item: OrderItemType, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof OrderItemTypeDao
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
