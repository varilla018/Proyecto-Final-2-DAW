import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LeagueService } from '../../services/league.service';

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

  constructor(public _alertController: AlertController, private leagueService: LeagueService) { }

  ngOnInit() {
    this.loadUserLeagues(); // Cargar las ligas del usuario al inicializar la página
  }

  loadUserLeagues() {
    this.leagueService.getUserLeagues().subscribe(leagues => {
      this.userLeagues = leagues;
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

  async abandonar(leagueId: number) {
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
}
