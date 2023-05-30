import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/players.service';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  button: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  players: any;
  slides: Slide[] = [
    // tus diapositivas aquí...
  ];
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadPlayers();
  }

  // Se ejecutará cada vez que esta página esté a punto de convertirse en la vista activa.
  ionViewWillEnter() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getUserPlayers().subscribe(
      data => {
        this.players = data;
      },
      err => {
        console.error(err);
      }
    );
  }
}
