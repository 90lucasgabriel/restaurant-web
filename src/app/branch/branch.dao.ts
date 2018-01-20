import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '@r-environment/environment';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Branch }                   from './branch.model';

/**
 * @class BranchDao
 */
@Injectable()
export class BranchDao {
  private path: string;

  /**
   * Creates an instance of BranchDao.
   * @param {HttpClient} http
   * @memberof BranchDao
   */
  constructor(private http: HttpClient) {
    this.path = `${environment.apiUrl}/api/company/${environment.COMPANY_ID}/branch/`;
  }

  /**
   * Returns a list of the resource
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Branch>>>}
   * @memberof BranchDao
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Branch>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   *  Returns only one item of the resource
   * @param {number} id
   * @returns {Observable<Presenter<Branch>>}
   * @memberof BranchDao
   */
  public get(id: number): Observable<Presenter<Branch>> {
    return this.http.get(this.path + id);
  }

   /**
   * Create new itemof resource on database
   * @param {Branch} item
   * @returns {Observable<any>}
   * @memberof BranchDao
   */
  public save(item: Branch): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param {Branch} item
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof BranchDao
   */
  public update(item: Branch, id: number): Observable<any> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource on database
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof BranchDao
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }
}
