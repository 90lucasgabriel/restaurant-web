import { Presenter } 		from '@r-model/presenter.model';
import { Company } 			from '@r-company/company.model';

export class Branch {
  constructor(
    public company_id?:		number,
    public phone_1?: 			string,
    public phone_2?: 			string,
    public email_1?: 			string,
    public email_2?: 			string,
    public facebook?: 		string,
    public twitter?: 			string,
    public instagram?: 		string,

    public address?: 			string,
    public number?: 			number,
    public complement?: 	string,
    public zipcode?: 			string,
    public neighborhood?:	string,
    public city?: 				string,
    public state?: 				string,
    public country?: 			string,

    public id?: 					number,
    public company?: 			Presenter<Company>,
    public checked?: 			boolean
  ) {	}
}
