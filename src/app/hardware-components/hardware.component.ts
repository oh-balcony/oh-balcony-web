import { Component, Input } from '@angular/core';

import { Pump, Valve, Tank, MoistureSensor } from '../shared';

@Component({
  selector: 'pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class PumpComponent {
  @Input()
  pump: Pump;
}

@Component({
  selector: 'valve',
  templateUrl: './valve.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class ValveComponent {
  @Input()
  valve: Valve;
}

@Component({
  selector: 'tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class TankComponent {
  @Input()
  tank: Tank;
}

@Component({
  selector: 'moisture-sensor',
  templateUrl: './moisture-sensor.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class MoistureSensorComponent {
  @Input()
  sensor: MoistureSensor;
}
