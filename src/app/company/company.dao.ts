import { Injectable, Injector }     from '@angular/core';
import { HttpClient, HttpParams }   from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { AppConfig }                from '@r-app/app.config';
import { Presenter }                from '@r-model/presenter.model';
import { QueryInput }               from '@r-model/query-input.model';

import { Company }                  from '@r-company/company.model';

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
    this.path = `${AppConfig.BASE_URL}/api/company/`;
  }

  /**
   * Returns a list of the resource
   * @param QueryInput queryInput
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Company>>>{
    return this.http.get(this.path, {params: <HttpParams> queryInput});
  }
}
