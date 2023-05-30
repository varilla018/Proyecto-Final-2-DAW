import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {

  apiUrl = environment.urlTournaments; // Asegúrate de que la URL es correcta

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.get<any>(this.apiUrl, httpOptions);
  }

  getTournament(tournamentId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.get<any>(`${this.apiUrl}${tournamentId}/`, httpOptions);
  }

  createTournament(tournamentData: any): Observable<any> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };

    return this.http.post<any>(this.apiUrl, tournamentData, httpOptions);
  }

  getTournamentMatches(tournamentId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.get<any>(`${environment.urlMatch}?tournament=${tournamentId}`, httpOptions);
  }

  getLeagues(): Observable<any> {
    const token = localStorage.getItem('access_token');
      
    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.get<any>(`${environment.urlLeague}`, httpOptions);
  }

  getTournamentFinal(tournamentId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    };

    return this.http.get<any>(`${this.apiUrl}${tournamentId}/final/`, httpOptions);
}

  

}
