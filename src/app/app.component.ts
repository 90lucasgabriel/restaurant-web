import { ChangeDetectorRef, Component, ViewChild, AfterViewInit }      from '@angular/core';
import { MediaMatcher }             from '@angular/cdk/layout';
import { MatSidenav }               from '@angular/material';
import { environment }              from '@r-environment/environment';
import { MaterialService }          from '@r-material/material.service';
import { LoaderService }            from '@r-service/loader.service';
import { AppConfig }                from '@r-app/app.config';
import { Location }                 from '@angular/common';

@Component({
  selector:     'app-root',
  templateUrl:  './app.component.html',
  styleUrls:    ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  public progressBarVisible = true;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('sidenav') sidenav: MatSidenav;

  menus = [
    {
      name: 'Filiais',
      icon: 'store',
      link: `company/${environment.COMPANY_ID}/branch`
    },
    {
      name: 'Categorias',
      icon: 'label',
      link: `company/${environment.COMPANY_ID}/category`
    },
    {
      name: 'Produtos',
      icon: 'shopping_cart',
      link: `company/${environment.COMPANY_ID}/product`
    },
    {
      name: 'Cardápios',
      icon: 'restaurant',
      link: `company/${environment.COMPANY_ID}/menu`
    },
    {
      name: 'Pedidos',
      icon: 'room_service',
      link: `company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order-detail`
    },
    {
      name: 'Contas',
      icon: 'assignment',
      link: `company/${environment.COMPANY_ID}/branch/${environment.BRANCH_ID}/order`
    }/*,
    {
      name: 'Status',
      icon: 'settings',
      link: `order-status`
    }*/
  ];

  themeList = AppConfig.THEME_LIST;

  constructor(
    private loader:             LoaderService,
    private changeDetectorRef:  ChangeDetectorRef,
    private location:           Location,
    private media:              MediaMatcher) {
    // change isLoading status whenever notified
    loader
      .onLoadingChanged
      .subscribe(isLoading => {
        this.progressBarVisible = isLoading;
      });

    // Change mode of sidenav if mobile
    this.verifyMobile(changeDetectorRef, media);
  }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.openSideNav();
    // this.location.go('company/1/branch');
  }

  private verifyMobile(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery          = media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public closeSideNav() {
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  public openSideNav() {
    if (!this.mobileQuery.matches) {
      this.sidenav.open();
    }
  }

  public selectTheme(theme) {
    document.body.className = '';
    document.body.classList.add(theme, 'mat-app-background');
  }
}
