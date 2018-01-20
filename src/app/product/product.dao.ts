import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Product }                  from '@r-product/product.model';

/**
 * @export
 * @class ProductDao
 */
@Injectable()
export class ProductDao {
  private path: string;

  /**
   * Creates an instance of ProductDao.
   * @param {HttpClient} http
   * @memberof ProductDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/product/`;
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Product>>>} 
   * @memberof ProductDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Product>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<Product>> {
    return this.http.get(this.path + id, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param Product item
   */
  public save(item: Product): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param Product item
   * @param number id
   */
  public update(item: Product, id: number): Observable<any> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }
}
