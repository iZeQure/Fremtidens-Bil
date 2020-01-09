import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const HEADERS = new HttpHeaders()
                      .set("accept", "x-custom-header");

const API_URL = 'http://10.108.226.9/Fremtidens-Bil-API/api';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  get apiURL() {
    return API_URL;
  }

  getAuthAccount(mail: string) {
    return this
            .http
            .get(`${API_URL}/credential/authaccount/${mail}`, {headers: HEADERS});
  }

  getUserById(id: string) {
    return this
            .http
            .get(`${API_URL}/user/id/${id}`, {headers: HEADERS});
  }

  // putHeartbeatFromFringerPrintId(fingerPrintId: number, heartRate: number) {
  //   return this
  //           .http
  //           .put(`${API_URL}/user/`);
  // }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)

      return of(result as any);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}