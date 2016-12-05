import { Component, OnInit } from '@angular/core';

import { ApiService, HardwareComponent } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  components: HardwareComponent[];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getComponents().then(components => this.components = components);
  }

}
