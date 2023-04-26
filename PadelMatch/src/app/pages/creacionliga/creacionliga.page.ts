import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-creacionliga',
  templateUrl: './creacionliga.page.html',
  styleUrls: ['./creacionliga.page.scss'],
})
export class CreacionligaPage {

  nombreLiga: string = '';
  codigoLiga: string = '';

  constructor(public navCtrl: NavController) { }

  generar() {
    // Aquí podrías generar un código aleatorio para la liga
    this.codigoLiga = Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  /*COMPARTIR POR WHATSAPP HAY QUE ARREGLARLO
  shareOnWhatsApp() {
    Share.share({
      title: 'Compartir Liga',
      text: 'Únete a mi liga usando este código: XXXXXX',
      url: '',
      dialogTitle: 'Compartir Liga'
    }).then(() => console.log('Shared on WhatsApp'));
  }
*/
  
}
