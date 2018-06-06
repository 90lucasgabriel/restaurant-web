import { Presenter }        from '@r-model/presenter.model';
import { Company }          from '@r-company/company.model';
import { Branch }           from '@r-branch/branch.model';
import { Diningtable }      from '@r-diningtable/diningtable.model';
import { Product }          from '@r-product/product.model';
import { Order }            from '@r-order/order.model';
import { OrderItemStatus }  from '@r-order-item-status/order-item-status.model';
import { OrderItemType }    from '@r-order-item-type/order-item-type.model';
import { Menu }             from '@r-menu/menu.model';

/**
 * Model OrderItem
 * @class OrderItem
 */
export class OrderItem {
  constructor(
    public id?:                     number,
    public order_id?:               number,
    public menu_id?:                number,
    public product_id?:             number,
    public diningtable_id?:         number,
    public order_item_status_id?:   number | Array<number>,
    public order_item_type_id?:     number,
    public price_person?:           number,
    public price_alacarte?:         number,
    public quantity?:               number,
    public comment?:                string,

    public diningtable?:            Diningtable | Presenter<Diningtable>,
    public order?:                  Order | Presenter<Order>,
    public product?:                Product | Presenter<Product>,
    public order_item_status?:      OrderItemStatus | Presenter<OrderItemStatus>,
    public order_item_type?:        OrderItemType | Presenter<OrderItemType>,
    public menu?:                   Menu | Presenter<Menu>
  ) { }
}
