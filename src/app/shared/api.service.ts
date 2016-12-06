import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { SystemState } from './model';

@Injectable()
export class ApiService {

  // TODO don't hardcode
  private apiEndpointBase = 'http://localhost:8080';

  private endpointSystemState = '/';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // TODO better error handling
    return Promise.reject(error.message || error);
  }
}
