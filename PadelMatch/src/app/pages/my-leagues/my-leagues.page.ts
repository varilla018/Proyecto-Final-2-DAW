import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../services/league.service';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-leagues',
  templateUrl: './my-leagues.page.html',
  styleUrls: ['./my-leagues.page.scss'],
})
export class MyLeaguesPage implements OnInit {
  leagueId: number = 0;
  league: any = {};
  leagueUsers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
  
    if (idParam !== null) {
      this.leagueId = Number(idParam);
      this.loadLeague();
      this.loadLeagueUsers();
    } else {
      console.error('No id param in route');
      
    }
  }
  

  loadLeague() {
    this.leagueService.getLeagues().subscribe((leagues: any[]) => {
      this.league = leagues.find(league => league.id === this.leagueId);
    }, error => {
      console.log(error);
    });
  }

  loadLeagueUsers() {
    this.leagueService.getLeagueUsers(this.leagueId).subscribe((users: any[]) => {
        // Ordena los usuarios por sus puntos (de mayor a menor)
        this.leagueUsers = users.sort((a, b) => parseFloat(b.userPoints) - parseFloat(a.userPoints));
    }, error => {
        console.log(error);
    });
  }

  async copyToClipboard() {
    await Clipboard.write({
      string: this.league.codeLeague
    });
    this.presentToast();
  }

  shareLeague() {
    const message = `Únete a nuestra liga en la aplicación de Padel! El código de la liga es: ${this.league.codeLeague}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(url, '_system');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Código copiado!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
}

}
