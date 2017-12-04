import { Component, ViewChild }     from '@angular/core';
import { MatSidenav }               from '@angular/material';
import { AppConfig }                from './app.config';
import { MaterialService }          from './material/material.service';
import { LoaderService }            from './loader.service';


@Component({
  selector:     'app-root',
  templateUrl:  './app.component.html',
  styleUrls:    ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav: MatSidenav;
  public progressBarVisible: boolean = true;

  constructor(private loader: LoaderService) {
    // change isLoading status whenever notified
    loader
      .onLoadingChanged
      .subscribe(isLoading => {
        this.progressBarVisible = isLoading;
      });
  }


  menus = [
    {
      name: 'Filiais',
      icon: 'store',
      link: 'company/' + AppConfig.COMPANY_ID + '/branch'
    },
    {
      name: 'Categorias',
      icon: 'label',
      link: 'company/' + AppConfig.COMPANY_ID + '/category'
    },
    {
      name: 'Produtos',
      icon: 'shopping_cart',
      link: 'company/' + AppConfig.COMPANY_ID + '/product'
    },
    {
      name: 'Cardápios',
      icon: 'restaurant',
      link: 'company/' + AppConfig.COMPANY_ID + '/menu'
    },
    {
      name: 'Pedidos',
      icon: 'assignment',
      link: 'company'
    }
  ];
}
