import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    const leagueData = {
      name: this.leagueName,
      password: this.leaguePassword,
      creator: localStorage.getItem('user_id') // Obtener el user_id del localStorage
    };

    this.leagueService.createLeague(leagueData).subscribe(
      (data: any) => {
        console.log(data);
        this.presentToast('Liga creada correctamente.');
        this.router.navigate(['/leagues']);
      },
      (error: any) => {
        console.log(error);
        this.presentToast('Error al crear la liga.');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
