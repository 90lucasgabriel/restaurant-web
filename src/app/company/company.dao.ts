import { Injectable, Injector }     from '@angular/core';
import { HttpClient }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '../app.config';
import { Presenter }                from '../common/model/presenter.model';
import { QueryInput }               from '../common/model/query-input.model';

import { Company }                  from './company.model';
import { HttpParams } from '@angular/common/http/src/params';

/**
 * @class CompanyDao
 */
@Injectable()
export class CompanyDao {
  private path: string;

  /**
   * Constructor
   * @param HttpClient http
   */
  constructor(
    private http:      HttpClient
  ) {
    this.setPath(AppConfig.BASE_URL + '/api/company');
  }

  /**
   * Display a listing of resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Company>>>{
    return this.http.get(this.getPath(), {params: <HttpParams> queryInput});
  }

  // GETTERS AND SETTERS ------------------------------------------------
  public getPath(): string {
    return this.path;
  }

  public setPath(value: string) {
    this.path = value;
  }
}
