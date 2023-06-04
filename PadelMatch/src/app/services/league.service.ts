import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {

  apiUrl = environment.urlLeague;

  constructor(private http: HttpClient) { }

  getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    };
  }

  getLeagues(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHttpOptions());
  }

  createLeague(leagueData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, leagueData, this.getHttpOptions());
  }
  
  joinLeague(codeLeague: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}join/`, { codeLeague: codeLeague }, this.getHttpOptions());
  }

  updateLeague(id: number, leagueData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, leagueData, this.getHttpOptions());
  }

  deleteLeague(leagueId: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<any>(`${this.apiUrl}delete/`, { body: { leagueId: leagueId }, headers: httpOptions.headers });
  }

  getLeagueUsers(leagueId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${leagueId}/get_league_users/`, this.getHttpOptions());
  }

  getUserLeagues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}user_leagues/`, this.getHttpOptions());
  }

  leaveLeague(leagueId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}leave/`, { leagueId: leagueId }, this.getHttpOptions());
  }

  
}
