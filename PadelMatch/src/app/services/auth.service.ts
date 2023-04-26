import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const url = `${this.apiUrl}register/`; 
    return this.http.post<any>(url, user);
  }
}
