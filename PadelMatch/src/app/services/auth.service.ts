import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  loginUser(user: any): Observable<any> {
    const url = `${this.apiUrl}login/`;
    return this.http.post<any>(url, user).pipe(
      tap((data: any) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', data.access);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserID(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.id;
    }
    return null;
  }
}
