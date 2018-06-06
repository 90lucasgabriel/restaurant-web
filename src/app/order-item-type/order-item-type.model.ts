import { Presenter } 		from '@r-model/presenter.model';
import { Company } 			from '@r-company/company.model';

export class OrderItemType {
  constructor(
    public id?:                     number,
    public name?:                   string,
    public description?:            string,
  ) { }
}
