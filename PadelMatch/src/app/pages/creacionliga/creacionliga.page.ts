import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-creacionliga',
  templateUrl: './creacionliga.page.html',
  styleUrls: ['./creacionliga.page.scss'],
})
export class CreacionligaPage {
  leagueName: string = '';
  leaguePassword: string = '';

  constructor(
    private leagueService: LeagueService,
    private router: Router,
    public toastController: ToastController
  ) {}

  createLeague() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwt_decode(token);

      const leagueData = {
        name: this.leagueName,
        password: this.leaguePassword,
        creator: decodedToken.user_id  // Usa el user_id del token decodificado aquí
      };

      this.leagueService.createLeague(leagueData).subscribe(
        (data: any) => {
          console.log(data);
          this.presentToast('Liga creada correctamente.');
          // Obtener las ligas del usuario después de crear una liga
          this.leagueService.getUserLeagues().subscribe(
            (userLeagues) => {
              // Navegar a la página de ligas con la lista actualizada de ligas
              this.router.navigate(['/ligas'], { state: { userLeagues: userLeagues } });
            },
            (error: any) => {
              console.log(error);
              this.presentToast('Error al obtener las ligas del usuario.');
            }
          );
        },
        (error: any) => {
          console.log(error);
          this.presentToast('Error al crear la liga.');
        }
      );
    } else {
      console.error("No access token found in localStorage");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
