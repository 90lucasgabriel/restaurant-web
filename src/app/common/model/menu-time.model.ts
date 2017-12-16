import { Day } from '../../day.enum';

/**
 * Model MenuTime
 * @class MenuTime
 */
export class MenuTime {
  constructor(
    public menu_id?:      number,
    public day?:          Day,
    public time_start?:	  string,
    public time_end?:	    string
  ) { }
}
