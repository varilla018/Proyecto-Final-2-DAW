import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {

  apiUrl = environment.urlLeague;

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createLeague(leagueData: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
        throw new Error("User is not logged in");
    }
    const userId = String(user.id);  // convert to string explicitly
    const headers = new HttpHeaders().set('User-Id', userId);
    return this.http.post<any>(this.apiUrl, leagueData, { headers });
}


  updateLeague(id: number, leagueData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, leagueData);
  }

  deleteLeague(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
