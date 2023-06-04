import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  apiUrl = environment.urlPlayer;

  constructor(private http: HttpClient) { }

  decodeToken(): any {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error("Access token is not available in localStorage");
    }

    return jwt_decode(token);
  }

  getUserPlayers(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.decodeToken().user_id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    return this.http.get<any>(`${this.apiUrl}user_players/`, httpOptions);
  }

  getRandomPlayers(): Observable<any> {
    const token = localStorage.getItem('access_token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };

    return this.http.get<any>(`${this.apiUrl}random_players/`, httpOptions);
  }

  buyPlayer(playerId: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.decodeToken().user_id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    const body = { player_id: playerId };
    
    return this.http.post<any>(`${this.apiUrl}buy_player/`, body, httpOptions);
  }

  sellPlayer(playerId: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.decodeToken().user_id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    const body = { player_id: playerId };
    
    return this.http.post<any>(`${this.apiUrl}sell_player/`, body, httpOptions);
  }

  getUserCash(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.decodeToken().user_id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    return this.http.get<any>(`${this.apiUrl}user_cash/`, httpOptions);
  }

  updateUserCash(amount: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.decodeToken().user_id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Id': userId
      })
    };

    const body = { cash: amount };
  
    return this.http.post<any>(`${this.apiUrl}update_user_cash/`, body, httpOptions);
  }

}
