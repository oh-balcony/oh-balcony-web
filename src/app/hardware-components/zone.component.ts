import { Component, Input } from '@angular/core';

import { HardwareInZone } from '../shared';

@Component({
  selector: 'zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent {
  @Input()
  hardwareInZone: HardwareInZone;
}
