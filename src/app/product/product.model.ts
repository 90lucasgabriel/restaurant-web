import { Presenter } 		from '@r-model/presenter.model';
import { Category } 		from '@r-category/category.model';
import { Company } 			from '@r-company/company.model';
import { MenuProduct } 	from '@r-model/menu-product.model';

/**
 * Model Product
 * @class Product
 */
export class Product {
  constructor(
    public id?: 					number,
    public company_id?:   number,
    public company?:  		Presenter<Company>,
    public category_id?:  number,
    public category?: 		Presenter<Category>,
    public name?: 				string,
    public description?:	string,
    public image?: 			  string,

    public checked?:			boolean,

    public pivot?:				MenuProduct,
    public price?:				number
  ) { }
}
