import { Injectable } from '@angular/core';
import { HardwareComponent } from './model';

@Injectable()
export class ApiService {
  getComponents(): Promise<HardwareComponent[]> {
    // TODO get components from web service
    // TODO make promise
    return Promise.resolve([
      { id: 'pump1', name: 'Pump 1' },
      { id: 'pump2', name: 'Pump 2' },
      { id: 'valve1', name: 'Valve 1' }
    ]);
  }
}
