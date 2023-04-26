import { Component, OnInit } from '@angular/core';

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
export class HomePage {

  slides: Slide[] = [
    {
      image: '../../../assets/slides/torneo1.png',
      title: 'La Rioja Padel Open 1000',
      subtitle: 'Del 07/03 al 12/03',
      button: 'Ver más'
    },
    {
      image: '../../../assets/slides/torneo2.png',
      title: 'Chile Padel Open 1000 ',
      subtitle: 'Del 13/03 al 19/03',
      button: 'Ver más'
    },
    {
      image: '../../../assets/slides/torneo3.png',
      title: 'Paraguay Padel Open 1000',
      subtitle: 'Del 20/03 al 26/03',
      button: 'Ver más'
    }
  ];

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor() {}

}
