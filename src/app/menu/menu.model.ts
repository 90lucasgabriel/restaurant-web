import { Presenter } 		from '../common/model/presenter.model';
import { Company } 			from '../company/company.model';
import { BranchMenu }   from '../common/model/branch-menu.model';
import { MenuProduct } 	from '../common/model/menu-product.model';

/**
 * Model Menu
 * @class Menu
 */
export class Menu {
  constructor(
    public id?: 					number,
    public company_id?:   number,
    public name?: 				string,
    public description?:	string,

    public checked?:			boolean,

    public pivot?:				MenuProduct|BranchMenu,
    public price?:				number,
    public company?:  		Presenter<Company>
  ) { }
}
