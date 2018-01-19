import { Presenter } 		from '@r-model/presenter.model';
import { Company } 			from '@r-company/company.model';
import { BranchMenu }   from '@r-model/branch-menu.model';
import { MenuProduct } 	from '@r-model/menu-product.model';
import { Product }      from '@r-product/product.model';
import { Branch }       from '@r-branch/branch.model';

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
