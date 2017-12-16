import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { Category } 			            from './category.model';
import { CategoryDao } 	              from './category.dao';

@Injectable()
export class CategoryService {
  item:  Category;
  items: Array<Category>;

  /**
   * Constructor
   *
   * @param CategoryDao dao
   */
  constructor(private dao: CategoryDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<Category>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<Category>>> {
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<Category>>
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<Category>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   *
   * @param Category item
   * @return Observable<Presenter<Category>>
   */
  public save(item: Category): Observable<Presenter<Category>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param Category item
   * @param number id
   * @return Observable<Presenter<Category>>
   */
  public update(item: Category, id: number): Observable<Presenter<Category>> {
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
}
