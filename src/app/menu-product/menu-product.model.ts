import { Presenter }	from '../common/model/presenter.model';
import { Company } 		from '../company/company.model';
import { Menu } 			from '../menu/menu.model';
import { Product } 		from '../product/product.model';

/**
 * Model MenuProduct
 * @class MenuProduct
 */
export class MenuProduct {
	constructor(
		public company_id?:   number,
		public menu_id?:  		number,
		public product_id?:  	number,
		public price?: 				number,
		public id?: 					number,
		public company?:  		Presenter<Company>,
		public menu?: 				Presenter<Menu>,
		public product?: 			Presenter<Product>
	) { }
}
