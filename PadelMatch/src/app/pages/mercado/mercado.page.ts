import { Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
 
interface Item {
  name: string;
  points: string;
  price: string;
  image: string;
}
 
@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
})
export class MercadoPage {
 
  public items: Item[] = [
    { name: 'STUPA', points: 'Puntos', price: '$10', image: '../../../assets/slides/tapia.jpg' },
    { name: 'CHINGOTO', points: 'Puntos', price: '$20', image: '../../../assets/slides/tapia.jpg' },
    { name: 'GARRIDO', points: 'Puntos', price: '$30', image: '../../../assets/slides/tapia.jpg' },
    { name: 'LAMPERTI', points: 'Puntos', price: '$40', image: '../../../assets/slides/tapia.jpg' },
  ];
 
  public timeInSeconds = 24 * 60 * 60;
 
  public config: CountdownConfig = {
    leftTime: this.timeInSeconds * 1000,
    format: 'HH:mm:ss',
    stopTime: new Date().getTime() + this.timeInSeconds * 1000
  };
 
  comprar(item: Item) {
    console.log('Comprando ' + item.name);
  }
 
  vender(item: Item) {
    console.log('Vendiendo ' + item.name);
  }
 
}
