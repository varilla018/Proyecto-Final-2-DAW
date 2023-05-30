import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournaments.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  tournamentData = {
    name: '',
    location: '',
    start_time: '',
    end_time: '',
    league: '', // Añade este campo para almacenar la liga seleccionada
  }

  leagues: any[] = []; // Almacena todas las ligas disponibles aquí
  finalMatch: any;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    // Obtiene todas las ligas cuando el componente se inicializa
    this.tournamentService.getLeagues().subscribe(response => {
      this.leagues = response;
    });
  }

  createTournament() {
    this.tournamentService.createTournament(this.tournamentData).subscribe(response => {
      console.log(response);
    });
  }
  

}
