import { Presenter } 		from '../common/model/presenter.model';
import { Company } 			from '../company/company.model';
import { BranchMenu }   from '../common/model/branch-menu.model';
import { MenuProduct } 	from '../common/model/menu-product.model';
import { Product }      from '../product/product.model';
import { Branch }       from '../branch/branch.model';

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
    public company?:  		Presenter<Company>,
    public time?:         Presenter<Array<any>>,
    public product?:      Presenter<Array<Product>>,
    public branch?:       Presenter<Array<Branch>>
  ) { }
}
