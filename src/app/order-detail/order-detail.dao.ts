import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { OrderDetail }              from '@r-order-detail/order-detail.model';

/**
 * @export
 * @class OrderDetailDao
 */
@Injectable()
export class OrderDetailDao {
  private path: string;

  /**
   * Creates an instance of OrderDetailDao.
   * @param {HttpClient} http
   * @memberof OrderDetailDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order-detail`;
  }

  /**
   * Returns a list of the resource.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<OrderDetail>>>}
   * @memberof OrderDetailDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<OrderDetail>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<OrderDetail>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param OrderDetail item
   */
  public save(item: OrderDetail): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param OrderDetail item
   * @param number id
   */
  public update(item: OrderDetail, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }

  public queryByBranch(queryInput: QueryInput): Observable<Presenter<Array<OrderDetail>>> {
    let path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order-detail`;
    return this.http.get(path, {params: <HttpParams> queryInput});
  }
}
