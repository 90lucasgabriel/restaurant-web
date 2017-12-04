import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeAdminComponent implements OnInit {

  cards = [
    {name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1},{name: 1}
  ];

  constructor() { }

  ngOnInit() {
  }
}
