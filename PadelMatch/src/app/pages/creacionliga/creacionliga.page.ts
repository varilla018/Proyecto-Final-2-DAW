import { Component } from '@angular/core';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-creacionliga',
  templateUrl: './creacionliga.page.html',
  styleUrls: ['./creacionliga.page.scss'],
})
export class CreacionligaPage {

  leagueName: string = '';
  leaguePassword: string = '';

  constructor(private leagueService: LeagueService) { }  // Inyecta tu servicio

  createLeague() {
    const leagueData = {
      name: this.leagueName,
      password: this.leaguePassword || null,  // Si la contraseña no se establece, envía null
    };
    this.leagueService.createLeague(leagueData).subscribe((response) => {
      console.log(response); // Aquí deberías ver un registro de la liga recién creada
      // Aquí también puedes limpiar los campos de entrada o navegar a otra página si lo deseas
    });
  }
}