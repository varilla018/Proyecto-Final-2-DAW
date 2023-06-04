import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournaments.service';
import jwt_decode from 'jwt-decode';

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
    league: '',
  }

  isAdmin: boolean = false;
  leagues: any[] = [];
  finalMatch: any;
  tournaments: any[] = [
    {
      image: '../../../assets/slides/french.jpg',
      title: 'FRENCH PADEL OPEN',
    },
    {
      image: '../../../assets/slides/valencia.jfif',
      title: 'ADESLAS VALÉNCIA OPEN',
    },
    {
      image: '../../../assets/slides/cervezas.jfif',
      title: 'VICTORIA MÁLAGA',
    },
    {
      image: '../../../assets/slides/finland.jfif',
      title: 'FINLAND PADEL OPEN',
    },
    {
      image: '../../../assets/slides/madrid.png',
      title: 'MADRID MASTER',
    }
    // Agrega más objetos de torneos según necesites
  ];

  slideOptions = {
    initialSlide: 0,
    speed: 400
  };
  
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    const token = localStorage.getItem('access_token');

    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.user_id;

      if (userId === 18) {
        this.isAdmin = true;
      }
    }

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
