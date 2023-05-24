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

    return this.http.post<any>(this.apiUrl, leagueData, httpOptions);
  }

  updateLeague(id: number, leagueData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, leagueData);
  }

  deleteLeague(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
