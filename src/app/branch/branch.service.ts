import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Branch } 			            from '@r-branch/branch.model';
import { BranchDao } 	              from '@r-branch/branch.dao';

@Injectable()
export class BranchService {
  item:  Branch;
  items: Array<Branch>;

  /**
   * Creates an instance of BranchService.
   * @param {BranchDao} dao
   * @memberof BranchService
   */
  constructor(private dao: BranchDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Branch>>>}
   * @memberof BranchService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Branch>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @returns {Observable<Presenter<Branch>>}
   * @memberof BranchService
   */
  public get(id: number): Observable<Presenter<Branch>> {
    return this.dao.get(id);
  }

  /**
   * Create resource.
   * @param {Branch} item
   * @returns {Observable<Presenter<Branch>>}
   * @memberof BranchService
   */
  public save(item: Branch): Observable<Presenter<Branch>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Branch} item
   * @param {number} id
   * @returns {Observable<Presenter<Branch>>}
   * @memberof BranchService
   */
  public update(item: Branch, id: number): Observable<Presenter<Branch>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof BranchService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of branch.
   * @param {Array<Branch>} list
   * @param {string} value
   * @returns {Array<Branch>}
   * @memberof BranchService
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
