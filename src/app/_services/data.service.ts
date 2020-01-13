import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../_models';
import { Observable } from 'rxjs';

/**
 * URL for the API to connect with the HTTP Client.
 */
const ROOT_API_URL = 'http://10.108.226.9/Fremtidens-Bil-API/';

const ACR_METHODS = ["GET", "POST", "PUT", "DELETE"];

const API_HEADERS = new HttpHeaders()
  .set("Content-Type", "multipart/form-data")
  .set("Content-Type", "text/plain; charset=utf-8")
  .set("Access-Control-Request-Method", ACR_METHODS)
  .set("Access-Control-Allow-Origin", '*');

const httpOptions: { headers: HttpHeaders; observe: any; } = {
  headers: new  HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Access-Control-Request-Method': 'POST'
  }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * GET Request
   * Check if the user ID, exists in the database.
   * @param user
   */
  getCheckUserExists(user: User) {
    return this.http.get<User>(`${ROOT_API_URL}user/check/${user.id}`, API_HEADERS[2]);
  }

  /**
   * GET Request
   * Check if the email, exists in the database.
   * @param user 
   */
  getCheckEmailExists(user: User) {
    return this.http.get<User>(`${ROOT_API_URL}credential/validate/${user.email}`, API_HEADERS[2]);
  }

  /**
   * GET Request
   * Gets user information, by the users ID.
   * @param user
   */
  getUserById(user: User) {
    return this.http.get<User>(`${ROOT_API_URL}user/id/${user.id}`, API_HEADERS[2]);
  }

  /**
   * POST Request
   * Creates a new user in the database,
   * if user id & email does not exists.
   * @param formData
   */
  postCreateUser(formData: FormData): Observable<Object> {
    return this.http.post(`${ROOT_API_URL}user/create`, formData, { headers: API_HEADERS[0] });      
  }

  /**
   * POST Request
   * Authenticates login credentials by the user on login.
   * @param formData 
   */
  postLoginUser(formData: FormData): Observable<Object> {
    return this.http.post(`${ROOT_API_URL}credential/login`, formData, { headers: API_HEADERS[0] });
  }
}
