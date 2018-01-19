import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '@r-model/query-input.model';
import { Presenter }                from '@r-model/presenter.model';

import { Category } 			          from '@r-category/category.model';
import { CategoryDao } 	            from '@r-category/category.dao';

@Injectable()
export class CategoryService {
  item:  Category;
  items: Array<Category>;

  /**
   * Creates an instance of CategoryService.
   * @param {CategoryDao} dao
   * @memberof CategoryService
   */
  constructor(private dao: CategoryDao) {}

  /**
   * Returns a resource list.
   * @param {QueryInput} queryInput
   * @returns {Observable<Presenter<Array<Category>>>}
   * @memberof CategoryService
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Category>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Returns only one item of the resource.
   * @param {number} id
   * @param {QueryInput} [queryInput]
   * @returns {Observable<Presenter<Category>>}
   * @memberof CategoryService
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Category>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   * @param {Category} item
   * @returns {Observable<Presenter<Category>>}
   * @memberof CategoryService
   */
  public save(item: Category): Observable<Presenter<Category>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   * @param {Category} item
   * @param {number} id
   * @returns {Observable<Presenter<Category>>}
   * @memberof CategoryService
   */
  public update(item: Category, id: number): Observable<Presenter<Category>> {
    return this.dao.update(item, id);
  }

  /**
   * Delete resource.
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof CategoryService
   */
  public delete(id: number): Observable<any> {
    return this.dao.delete(id);
  }
}
