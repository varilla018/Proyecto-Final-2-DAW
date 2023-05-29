import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  apiUrl = environment.urlPlayer;  // Asegúrate de definir la URL del API para los jugadores en tus variables de entorno

  constructor(private http: HttpClient) { }

  // Método para obtener los jugadores de un usuario específico
  getUserPlayers(): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}user_players/`, httpOptions);
  }

  // Método para obtener jugadores aleatorios
  getRandomPlayers(): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}random_players/`, httpOptions);
  }

  buyPlayer(playerId: string): Observable<any> {
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

    const body = { player_id: playerId };
    
    return this.http.post<any>(`${this.apiUrl}buy_player/`, body, httpOptions);
  }

  sellPlayer(playerId: string): Observable<any> {
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

    const body = { player_id: playerId };
    
    return this.http.post<any>(`${this.apiUrl}sell_player/`, body, httpOptions);
  }

  // Método para obtener el efectivo del usuario
getUserCash(): Observable<any> {
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

  return this.http.get<any>(`${this.apiUrl}user_cash/`, httpOptions);
}

// Método para actualizar el efectivo del usuario
updateUserCash(amount: number): Observable<any> {
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

  const body = { cash: amount };
  
  return this.http.post<any>(`${this.apiUrl}update_user_cash/`, body, httpOptions);
}

}
  
