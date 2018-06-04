import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Diningtable } 			        from '@r-diningtable/diningtable.model';
import { DiningtableDao } 	        from '@r-diningtable/diningtable.dao';

@Injectable()
export class DiningtableService {
  item:  Diningtable;
  items: Array<Diningtable>;

  /**
   * Creates an instance of DiningtableService.
   * @param {DiningtableDao} dao
   * @memberof DiningtableService
   */
  constructor(private dao: DiningtableDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Diningtable>>>}
   * @memberof DiningtableService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Diningtable>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<Diningtable>>}
   * @memberof DiningtableService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Diningtable>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Create new resource.
   * @param {Diningtable} item
   * @returns {Observable<Presenter<Diningtable>>}
   * @memberof DiningtableService
   */
  public save(item: Diningtable): Observable<Presenter<Diningtable>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Diningtable} item
   * @param {number} id
   * @returns {Observable<Presenter<Diningtable>>}
   * @memberof DiningtableService
   */
  public update(item: Diningtable, id: number): Observable<Presenter<Diningtable>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof DiningtableService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }

  /**
   * Filter a list of product
   * @param {Array<Diningtable>} list
   * @param {string} value
   * @returns {Array<Diningtable>}
   * @memberof DiningtableService
   */
  public filter(list: Array<Diningtable>, value: string): Array<Diningtable> {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      list = list.filter(item =>
        item.id.toString() === value ||
        item.code.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
      );
    }

    return list;
  }
}
