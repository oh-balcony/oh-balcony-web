import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import { SystemState, TimeRange } from './model';

@Injectable()
export class ApiService {

  // TODO don't hardcode
  private apiEndpointBase = 'http://localhost:8080/api';

  private endpointSystemState = '/systemState';
  private endpointSensorValues = '/sensorValues';

  constructor(private http: Http) { }

  getSystemState(): Promise<SystemState> {
    return this.http.get(this.apiEndpointBase + this.endpointSystemState)
      .toPromise()
      .then(response => {
        let jsonData = response.json();
        return jsonData as SystemState;
      })
      .catch(this.handleError);
  }

  getSensorValues(timeRange: TimeRange): Promise<Object[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('fromTimeMillis', timeRange.from.getTime().toString());
    params.set('toTimeMillis', timeRange.to.getTime().toString());

    return this.http.get(this.apiEndpointBase + this.endpointSensorValues,
      { search: params })
      .toPromise()
      .then(response => {
        let jsonData = response.json();
        return jsonData.values;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // TODO better error handling
    return Promise.reject(error.message || error);
  }
}
