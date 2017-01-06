import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ApiService, SystemState, Zone, HardwareInZone, Controller, Pump,
  Valve, Tank, MoistureSensor, HardwareReference, Hardware, TimeRange } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  systemState: SystemState;

  hardwareInZones: HardwareInZone[];

  timeRanges = {
    'day': 'Last day',
    '3days': 'Last 3 days',
    'week': 'Last week',
    '2weeks': 'Last 2 weeks',
    'month': 'Last month',
    'year': 'Last year'
    // when extending this list also extend the function mapTimeRangeString() below
  };

  selectedTimeRange: string;

  timeRange: TimeRange;

  constructor(private api: ApiService) {
    this.selectTimeRange('day');
  }

  ngOnInit() {
    this.api.getSystemState().then(systemState => this.updateSystemState(systemState));
  }

  updateSystemState(systemState: SystemState): void {
    this.systemState = systemState;
    this.hardwareInZones = [];
    for (let zone of systemState.zones) {
      let hardwareInZone = new HardwareInZone();
      for (let ref of zone.hardwareReferences) {
        let controller = this.getControllerById(ref.controllerId);
        if (controller) {
          this.copyHardwareFromControllerById(controller, hardwareInZone, ref.componentId);
        }
      }
      this.hardwareInZones.push(hardwareInZone);
    }
  }

  copyHardwareFromControllerById(from: Controller, to: HardwareInZone, id: string) {
    this.copyHardwareById(from.pumps, to.pumps, id);
    this.copyHardwareById(from.valves, to.valves, id);
    this.copyHardwareById(from.moistureSensors, to.moistureSensors, id);
    this.copyHardwareById(from.tanks, to.tanks, id);
  }

  copyHardwareById(from: Hardware[], to: Hardware[], id: string) {
    let hw = from.find(h => h.id === id);
    if (hw) {
      to.push(hw);
    }
  }

  getControllerById(id: string): Controller {
    return this.systemState.controllers.find(c => c.id === id);
  }

  getHardwareByReference(ref: HardwareReference): Hardware {
    let controller = this.getControllerById(ref.controllerId);
    return controller ? this.getHardwareById(controller, ref.componentId) : undefined;
  }

  getAllComponents(controller: Controller): Hardware[] {
    let hardware: Hardware[] = [];
    return hardware.concat(controller.pumps, controller.valves, controller.tanks, controller.moistureSensors);
  }

  getHardwareById(controller: Controller, id: string): Hardware {
    return this.getAllComponents(controller).find(h => h.id === id);
  }

  mapTimeRangeString(timeRangeString: string): Date {
    switch (timeRangeString) {
      case 'day': return moment().subtract(1, 'days').toDate();
      case '3days': return moment().subtract(3, 'days').toDate();
      case 'week': return moment().subtract(1, 'week').toDate();
      case '2weeks': return moment().subtract(2, 'weeks').toDate();
      case 'month': return moment().subtract(1, 'month').toDate();
      case 'year': return moment().subtract(1, 'year').toDate();
    }
  }

  selectTimeRange(timeRange: string) {
    this.selectedTimeRange = timeRange;
    this.timeRange = {
      from: this.mapTimeRangeString(timeRange),
      to: new Date()
    };
  }

}
