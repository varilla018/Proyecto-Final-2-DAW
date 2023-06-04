import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LeagueService } from '../../services/league.service';
import { Router, NavigationEnd } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.page.html',
  styleUrls: ['./ligas.page.scss'],
})
export class LigasPage implements OnInit {
  codigoLiga: string = '';
  numeroEquipos: number = 0;
  nombreLiga: string = 'DAW PADEL';
  nombreLiga2: string = '';
  userLeagues: any[] = [];

  constructor(public _alertController: AlertController, private leagueService: LeagueService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/ligas') {
        this.loadUserLeagues();
      }
    });
  }

  ngOnInit() {
    // this.loadUserLeagues(); // Not needed anymore, because it's handled by the router event subscription now
  }

  loadUserLeagues() {
    const token = localStorage.getItem('access_token');
    let userId: string = '';

    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.user_id;
    }

    this.leagueService.getUserLeagues().subscribe((leagues: any[]) => {
      this.userLeagues = leagues.map((league: any) => {
        league.isUserCreator = league.creator == userId; // Establecer isUserCreator basándose en si el id del creador de la liga es igual al id del usuario
        return league;
      });
    }, error => {
      console.log(error);
    });
  }

  buscar() {
    console.log(this.codigoLiga);

    this.leagueService.joinLeague(this.codigoLiga).subscribe(response => {
      console.log(response);

      this.loadUserLeagues(); // Actualizar las ligas del usuario después de unirse a una liga
    }, error => {
      console.log(error);
    });
  }

  async abandonar($event: MouseEvent, leagueId: number) {
    $event.stopPropagation();  // Añade esta línea
  
    const alert = await this._alertController.create({
      header: 'Abandonar Liga',
      message: '¿Está seguro de que desea abandonar la liga?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Abandonar',
          handler: () => {
            console.log('Abandonar clicked');
            this.leagueService.leaveLeague(leagueId).subscribe(response => {
              console.log(response);
  
              this.loadUserLeagues(); // Actualizar las ligas del usuario después de abandonar una liga
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async deleteLeague($event: MouseEvent, leagueId: number) {
    $event.stopPropagation();  // Añade esta línea
  
    const alert = await this._alertController.create({
      header: 'Eliminar Liga',
      message: '¿Está seguro de que desea eliminar la liga?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.leagueService.deleteLeague(leagueId).subscribe(response => {
              console.log(response);
  
              this.loadUserLeagues(); // Actualizar las ligas del usuario después de eliminar una liga
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }

  
  goToLeagueDetails(leagueId: number) {
    this.router.navigate(['/my-leagues', leagueId]);
  }
  
}





  



