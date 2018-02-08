import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Order }                    from '@r-order/order.model';

/**
 * @export
 * @class OrderDao
 */
@Injectable()
export class OrderDao {
  private path: string;

  /**
   * Creates an instance of OrderDao.
   * @param {HttpClient} http
   * @memberof OrderDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order`;
  }

  /**
   * Returns a list of the resource.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Order>>>}
   * @memberof OrderDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Order>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<Order>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param Order item
   */
  public save(item: Order): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param Order item
   * @param number id
   */
  public update(item: Order, id: number): Observable<any> {
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
