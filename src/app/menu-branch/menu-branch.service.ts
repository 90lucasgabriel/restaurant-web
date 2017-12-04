import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';

import { QueryInput }               from '../common/model/query-input.model';
import { Presenter }                from '../common/model/presenter.model';

import { MenuBranch } 			        from './menu-branch.model';
import { MenuBranchDao } 	          from './menu-branch.dao';

@Injectable()
export class MenuBranchService {
  item:  MenuBranch;
  items: Array<MenuBranch>;

  /**
   * Constructor
   *
   * @param MenuBranchDao dao
   */
  constructor(private dao: MenuBranchDao) {}

  /**
   * Give a list of resource from database.
   *
   * @param QueryInput queryInput
   * @return Observable<Presenter<Array<MenuBranch>>>
   */
  public query(queryInput: QueryInput): Observable<Presenter<Array<MenuBranch>>>{
    return this.dao.query(queryInput);
  }

  /**
   * Give a list of resource.
   *
   * @param number id
   * @return Observable<Presenter<MenuBranch>>
   */
  public get(id: number, queryInput?: QueryInput): Observable<Presenter<MenuBranch>> {
    return this.dao.get(id, queryInput);
  }

  /**
   * Update resource.
   *
   * @param MenuBranch item
   * @return Observable<Presenter<MenuBranch>>
   */
  public save(item: MenuBranch): Observable<Presenter<MenuBranch>> {
    return this.dao.save(item);
  }

  /**
   * Update resource.
   *
   * @param MenuBranch item
   * @param number id
   * @return Observable<Presenter<MenuBranch>>
   */
  public update(item: MenuBranch, id: number): Observable<Presenter<MenuBranch>> {
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
   * Delete resource by Company.
   * @param number company_id
   * @return boolean
   */
  public deleteByCompany(company_id: number): Observable<any> {
    return this.dao.deleteByCompany(company_id);
  }
}
