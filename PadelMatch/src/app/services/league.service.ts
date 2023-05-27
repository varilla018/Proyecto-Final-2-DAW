import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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
    const token = localStorage.getItem('access_token'); // Obtener el token de acceso del localStorage
    const userId = localStorage.getItem('user_id'); // Obtener el id del usuario del localStorage

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
      throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Incluir el token de acceso en el encabezado de la solicitud
        'User-Id': userId // Incluir el id del usuario en el encabezado de la solicitud
      })
    };

    return this.http.post<any>(this.apiUrl, leagueData, httpOptions).pipe(
      switchMap(() => this.getUserLeagues())  // Solicitar las ligas del usuario después de crear la liga
    );
  }



  joinLeague(codeLeague: string): Observable<any> {
    const token = localStorage.getItem('access_token'); // Obtener el token de acceso del localStorage
    const userId = localStorage.getItem('user_id'); // Obtener el id del usuario del localStorage

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
      throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Incluir el token de acceso en el encabezado de la solicitud
        'User-Id': userId // Incluir el id del usuario en el encabezado de la solicitud
      })
    };

    return this.http.post<any>(`${this.apiUrl}join/`, { codeLeague: codeLeague }, httpOptions);
  }

  updateLeague(id: number, leagueData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, leagueData);
  }

  deleteLeague(leagueId: number): Observable<any> {
    const token = localStorage.getItem('access_token'); // Obtener el token de acceso del localStorage
    const userId = localStorage.getItem('user_id'); // Obtener el id del usuario del localStorage

    if (!token) {
        throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
        throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir el token de acceso en el encabezado de la solicitud
            'User-Id': userId // Incluir el id del usuario en el encabezado de la solicitud
        })
    };

    return this.http.delete<any>(`${this.apiUrl}delete/`, { body: { leagueId: leagueId }, headers: httpOptions.headers });
}


  getLeagueUsers(leagueId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
      throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    return this.http.get<any>(`${this.apiUrl}${leagueId}/users/`, httpOptions);
  }

  // league.service.ts
  getUserLeagues(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
      throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    return this.http.get<any>(`${this.apiUrl}user_leagues/`, httpOptions);
  }

  leaveLeague(leagueId: number): Observable<any> {
    const token = localStorage.getItem('access_token'); // Obtener el token de acceso del localStorage
    const userId = localStorage.getItem('user_id'); // Obtener el id del usuario del localStorage

    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    if (!userId) {
      throw new Error("User id is not available in localStorage");
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Incluir el token de acceso en el encabezado de la solicitud
        'User-Id': userId // Incluir el id del usuario en el encabezado de la solicitud
      })
    };

    return this.http.post<any>(`${this.apiUrl}leave/`, { leagueId: leagueId }, httpOptions);
  }


}
