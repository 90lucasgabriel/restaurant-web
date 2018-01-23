import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Category }                 from '@r-category/category.model';

/**
 * @export
 * @class CategoryDao
 */
@Injectable()
export class CategoryDao {
  private path: string;

  /**
   * Creates an instance of CategoryDao.
   * @param {HttpClient} http
   * @memberof CategoryDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/category`;
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Category>>>}
   * @memberof CategoryDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Category>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Category>>}
   * @memberof CategoryDao
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<Category>> {
    return this.http.get(`${this.path}/${id}`, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database.
   * @param {Category} item
   * @returns {Observable<any>}
   * @memberof CategoryDao
   */
  public save(item: Category): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param {Category} item
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof CategoryDao
   */
  public update(item: Category, id: number): Observable<any> {
    return this.http.put(`${this.path}/${id}`, item);
  }

  /**
   * Delete resource on database
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof CategoryDao
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
