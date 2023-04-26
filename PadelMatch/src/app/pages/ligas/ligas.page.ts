import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.page.html',
  styleUrls: ['./ligas.page.scss'],
})
export class LigasPage implements OnInit {
codigoLiga: string = '';
numeroEquipos:number = 0;
nombreLiga:string = 'DAW PADEL';
nombreLiga2:string = '';

  constructor(public _alertController: AlertController) { }

  ngOnInit() {
  }

  buscar() {
    console.log(this.codigoLiga);
    //codigo para buscar el parametro
  }

  async abandonar() {
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
            console.log('Borrar clicked');
          }
        }
      ]
    });

    await alert.present();
  }

}
