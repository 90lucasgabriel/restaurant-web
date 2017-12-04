import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '../app.config';
import { Presenter }                from '../common/model/presenter.model';
import { QueryInput }               from '../common/model/query-input.model';

import { MenuBranch }               from './menu-branch.model';

/**
 * @class MenuBranchDao
 */
@Injectable()
export class MenuBranchDao {
  private path: string;

  /**
   * Constructor
   * @param HttpClient http
   */
  constructor(private http: HttpClient) {
    this.path = AppConfig.BASE_URL + '/api/company/' + AppConfig.COMPANY_ID + '/menu-branch/';
  }

  /**
   * Display a listing of resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<MenuBranch>>> {
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }

  /**
   * Display details of resource on database
   * @param number id
   */
  public get(id: number, queryInput: QueryInput): Observable<Presenter<MenuBranch>> {
    return this.http.get(this.path + id, {params: <HttpParams> queryInput});
  }

   /**
   * Create new itemof resource on database
   * @param MenuBranch item
   */
  public save(item: MenuBranch): Observable<any> {
    return this.http.post(this.path, item);
  }

  /**
   * Update details of resource on database
   * @param MenuBranch item
   * @param number id
   */
  public update(item: MenuBranch, id: number): Observable<any> {
    return this.http.put(this.path + id, item);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public delete(id: number): Observable<any> {
    return this.http.delete(this.path + id);
  }

  /**
   * Delete resource on database
   * @param number id
   */
  public deleteByCompany(company_id: number): Observable<any> {
    return this.http.delete(this.path);
  }
}
