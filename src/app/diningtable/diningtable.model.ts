import { Presenter } 		from '@r-model/presenter.model';
import { Branch } 		  from '@r-branch/branch.model';

/**
 * Model Diningtable
 * @class Diningtable
 */
export class Diningtable {
  constructor(
    public id?: 					number,
    public branch_id?: 		number,
    public code?:         string,
    public description?:  string,

    public branch?:       Branch
  ) { }
}
