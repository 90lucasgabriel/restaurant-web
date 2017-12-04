import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '../app.config';
import { Presenter }                from '../common/model/presenter.model';
import { QueryInput }               from '../common/model/query-input.model';

import { Branch }                   from './branch.model';

/**
 * @class BranchDao
 */
@Injectable()
export class BranchDao {
  private path: string;

  /**
   * Constructor
   * @param HttpClient http
   */
  constructor(private http: HttpClient) {
    this.path = AppConfig.BASE_URL + '/api/company/' + AppConfig.COMPANY_ID + '/branch/';
  }

  /**
   * Display a listing of resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Branch>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   * Display details of resource on database
   * @param number id
   */
  public get(id: number): Observable<Presenter<Branch>> {
    return this.http.get(this.path + id);
  }

   /**
   * Create new itemof resource on database
   * @param Branch item
   */
  public save(item: Branch): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param Branch item
   * @param number id
   */
  public update(item: Branch, id: number): Observable<any> {
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
