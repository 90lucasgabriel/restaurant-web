import { Presenter   } from '@r-model/presenter.model';
import { Company     } from '@r-company/company.model';
import { Branch      } from '@r-app/branch/branch.model';
import { OrderDetail } from '@r-app/order-detail/order-detail.model';
import { OrderStatus } from '@r-app/order-status/order-status.model';
import { Product     } from '@r-app/product/product.model';
import { Menu        } from '@r-app/menu/menu.model';

/**
 * Model Order
 * @class Order
 */
export class Order {
  constructor(
    public id?: 					    number,
    public company_id?:       number,
    public branch_id?:        number,
    public diningtable_id?:   number,
    public order_status_id?:  number,
    public total?:            number,

    public company?:  		    Presenter<Company>,
    public branch?:  		      Presenter<Branch>,
    public diningtable?:      Presenter<Diningtable>,
    public orderStatus?:      Presenter<OrderStatus>,
    public orderDetail?:      OrderDetail | Presenter<Array<OrderDetail>>
  ) { }
}

export class Diningtable {
  constructor(
    public id?: number,
    public code?: string,
    public description?: string,
  ) { }
}
