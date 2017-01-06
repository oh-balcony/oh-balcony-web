import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Pump, Valve, Tank, MoistureSensor, ApiService, TimeRange } from '../shared';

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
export class MoistureSensorComponent implements OnInit, OnChanges {
  @Input()
  sensor: MoistureSensor;

  @Input()
  timeRange: TimeRange;

  lastRequestedTimeRange: TimeRange;

  public lineChartData: Array<any> = [
    {
      label: 'Moisture',
      data: []
    }
  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [{
        type: 'linear',
        ticks: {
          min: 0,
          max: 1
        }
      }],
      xAxes: [{
        type: 'time',
        position: 'bottom',
        time: {
          // maximum is always now
          max: new Date(),
          // TODO localized date/time should be used here depending on the browser locale
          displayFormats: {
              millisecond: 'SSS [ms]',
              second: 'HH:mm:ss',
              minute: 'HH:mm:ss',
              hour: 'D. MMM HH:mm',
              day: 'D. MMM YYYY',
              week: 'D. MMM YYYY',
              month: 'MMM YYYY',
              quarter: '[Q]Q - YYYY',
              year: 'YYYY'
          },
          tooltipFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(94, 155, 255, 0.1)',
      borderColor: 'rgba(94, 155, 255, 1)',
      pointBackgroundColor: 'rgba(94, 155, 255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(94, 155, 255,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.requestData();
  }

  ngOnChanges() {
    this.requestData();
  }

  requestData() {
    if (this.lastRequestedTimeRange !== this.timeRange) {
      this.api.getSensorValues(this.timeRange).then(values => this.updateData(values));
      this.lastRequestedTimeRange = this.timeRange;
    }
  }

  updateData(values: Object[]): void {
    this.lineChartData = [
      {
        label: 'Moisture',
        data: values
      }
    ];
  }

}
