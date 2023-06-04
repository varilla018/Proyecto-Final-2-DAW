import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        localStorage.setItem('access_token', data.access);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserDetails(): Observable<any> {
    const token = this.getAccessToken();

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<any>(`${this.apiUrl}users/me/`, httpOptions);
  }

}
