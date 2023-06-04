import { Component, OnInit } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { PlayerService } from '../../services/players.service';
import { ToastController } from '@ionic/angular';

interface Item {
  id: string;
  name: string;
  surname: string;
  ranking: number;
  points: number;
  winrate: number;
  price: number;
  image_url: string;  // Añade esta línea
}

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
})
export class MercadoPage implements OnInit {

  public userItems: Item[] = [];
  public items: Item[] = [];
  public timeInSeconds = 24 * 60 * 60;
  public userCash: number = 50;

  public config: CountdownConfig = {
    leftTime: this.timeInSeconds * 1000,
    format: 'HH:mm:ss',
    stopTime: new Date().getTime() + this.timeInSeconds * 1000
  };

  constructor(private playerService: PlayerService, private toastController: ToastController) { }

  ngOnInit() {
    this.playerService.getRandomPlayers().subscribe((players) => {
      this.items = players;
    });

    this.playerService.getUserPlayers().subscribe((players) => {
      this.userItems = players;
    });

    // Inicializar el cash del usuario
    this.playerService.getUserCash().subscribe((data) => {
      this.userCash = data.cash;
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dinero insuficiente para comprar este jugador.',
      duration: 2000
    });
    toast.present();
  }

  comprar(item: Item) {
    // Comprobar si el usuario tiene suficiente dinero para comprar el jugador
    if (item.price > this.userCash) {
      this.presentToast();
    } else {
      this.playerService.buyPlayer(item.id).subscribe(
        response => {
          console.log('Jugador comprado: ' + item.name);
          // Actualizar la lista de jugadores del usuario y eliminar el jugador comprado del mercado
          this.userItems = [...this.userItems, item];
          this.items = this.items.filter(player => player.id !== item.id);

          // Actualizar el cash del usuario
          this.playerService.getUserCash().subscribe((data) => {
            this.userCash = data.cash;
          });
        },
        error => {
          console.log('Hubo un error al comprar el jugador: ', error);
        }
      );
    }
  }

  vender(item: Item) {
    this.playerService.sellPlayer(item.id).subscribe(
      response => {
        console.log('Jugador vendido: ' + item.name);
        // Actualizar la lista de jugadores del usuario y agregar el jugador vendido al mercado
        this.userItems = this.userItems.filter(player => player.id !== item.id);
        this.items = [...this.items, item];

        // Actualizar el cash del usuario
        this.playerService.getUserCash().subscribe((data) => {
          this.userCash = data.cash;
        });
      },
      error => {
        console.log('Hubo un error al vender el jugador: ', error);
      }
    );
  }
  
}
