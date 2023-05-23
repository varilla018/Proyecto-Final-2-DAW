import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLeagues(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createLeague(leagueData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, leagueData);
  }

  updateLeague(id: number, leagueData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, leagueData);
  }

  deleteLeague(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
