import { Injectable }             from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';
import { Observable }             from 'rxjs/Observable';

@Injectable()
export class RouteService {

  constructor(
    private router:         Router,
    private route:          ActivatedRoute,
    private location:       Location
  ) { }

  /**
   * Get params of current route
   */
  public getParam(): Observable<{[key: string]: any}> {
    return this.route.params;
  }

  /**
   * Go to the last route
   */
  public goBack() {
    this.location.back();
  }

  /**
   * Go to Branch list route
   * @param number company_id
   */
  public goBranchList(company_id: number) {
    this.router.navigate(['/company', company_id]);
  }

  /**
   * Go to specific branch route
   * @param number company_id
   * @param number branch_id
   */
  public goBranchDetails(company_id: number, branch_id: number) {
    this.router.navigate(['/company', company_id, 'branch', branch_id]);
  }

  /**
   * Go to create route
   * @param number company_id
   */
  public goBranchCreate(company_id: number) {
    this.router.navigate(['/company', company_id, 'new']);
  }

  /**
   * Go to edit route
   * @param number company_id
   * @param number branch_id
   */
  public goBranchEdit(company_id: number, branch_id: number) {
    this.router.navigate(['/company', company_id, 'branch', branch_id, 'edit']);
  }
}
