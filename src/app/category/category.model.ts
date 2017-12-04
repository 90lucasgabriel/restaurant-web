import { Presenter } 		from '../common/model/presenter.model';
import { Company } 			from '../company/company.model';

export class Category {
	constructor(
		public id?: 					number,
		public company_id?:	  number,
		public company?:	    Presenter<Company>,
		public parent_id?:		number,
		public parent?: 		  Presenter<Category>,
		public name?: 			  string,
		public description?: 	string,
		public image?: 				string
	) {	}
}
