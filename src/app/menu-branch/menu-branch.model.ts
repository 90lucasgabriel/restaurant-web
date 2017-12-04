import { Presenter }	from '../common/model/presenter.model';
import { Company } 		from '../company/company.model';
import { Menu } 			from '../menu/menu.model';
import { Branch } 		from '../branch/branch.model';

/**
 * Model MenuBranch
 * @class MenuBranch
 */
export class MenuBranch {
	constructor(
		public company_id?:   number,
		public menu_id?:  		number,
		public branch_id?:  	number,
		public id?: 					number,
		public company?:  		Presenter<Company>,
		public menu?: 				Presenter<Menu>,
		public branch?: 			Presenter<Branch>
	) { }
}
