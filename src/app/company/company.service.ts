import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Company } 			            from '@r-company/company.model';
import { CompanyDao } 	            from '@r-company/company.dao';

@Injectable()
export class CompanyService {
  private item:  Company;
  private items: Array<Company>;

  /**
   * Constructor
   *
   * @param CompanyDao dao
   */
  constructor(private dao: CompanyDao) {}

  /**
   * Returns a resource list.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<Company>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Company>>>{
    return this.dao.query(queryInput);
  }



  // GETTERS AND SETTERS --------------------------------------------------
  public getItem(): Company {
    return this.item;
  }

  public setItem(value: Company) {
    this.item = value;
  }

  public getItems(): Array<Company> {
    return this.items;
  }

  public setItems(value: Array<Company>) {
    this.items = value;
  }
}
