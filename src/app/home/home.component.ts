import { Component, OnInit } from '@angular/core';

import { ApiService, Controller } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  controllers: Controller[];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getControllers().then(controllers => this.controllers = controllers);
  }

}
