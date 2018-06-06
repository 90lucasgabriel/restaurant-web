import { Presenter } 		from '@r-model/presenter.model';
import { Company } 			from '@r-company/company.model';

export class OrderItemStatus {
  constructor(
    public id?:                     number,
    public name?:                   string,
    public description?:            string,
  ) { }
}
