import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { Branch } 			            from './branch.model';
import { BranchDao } 	              from './branch.dao';

@Injectable()
export class BranchService {
  item:  Branch;
  items: Array<Branch>;

  /**
   * Constructor
   *
   * @param BranchDao dao
   */
  constructor(private dao: BranchDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<Branch>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Branch>>>{
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<Branch>>
   */
  public get(id: number): Observable<Presenter<Branch>> {
    return this.dao.get(id);
  }

  /**
   * Update resource.
   *
   * @param Branch item
   * @return Observable<Presenter<Branch>>
   */
  public save(item: Branch): Observable<Presenter<Branch>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param Branch item
   * @param number id
   * @return Observable<Presenter<Branch>>
   */
  public update(item: Branch, id: number): Observable<Presenter<Branch>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param number id
   * @return boolean
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of Branch
   * @param list 
   * @param value 
   */
  public filter(list: Array<Branch>, value: string): Array<Branch> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString()     === value           ||
        item.number.toString() === value           ||
        item.address.toLowerCase().includes(value) ||
        item.city.toLowerCase().includes(value)    ||
        item.state.toLowerCase().includes(value)   ||
        item.zipcode.toLowerCase().includes(value) ||
        item.phone_1.toLowerCase().includes(value) ||
        item.phone_2.toLowerCase().includes(value) ||
        item.email_1.toLowerCase().includes(value) ||
        item.email_2.toLowerCase().includes(value)
      );
    }

    return list;
  }
}
