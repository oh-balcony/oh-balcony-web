import { Injectable } from '@angular/core';
import { Controller } from './model';

@Injectable()
export class ApiService {
  getControllers(): Promise<Controller[]> {
    // TODO get components from web service
    return Promise.resolve([{
      id: 'controller1',
      name: 'Controller',
      pumps: [
        { id: 'pump1', name: 'Pump 1' },
        { id: 'pump2', name: 'Pump 2' }
      ],
      valves: [
        { id: 'valve1', name: 'Valve 1' }
      ],
      tanks: [
        { id: 'tank1', name: 'Tank 1' }
      ],
      moistureSensors: [
        { id: 'moisture1', name: 'Erdbeeren' },
        { id: 'moisture1', name: 'Wein' }
      ]
    }]);
  }
}
