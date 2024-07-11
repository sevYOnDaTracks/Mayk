import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
@Component({
  selector: 'app-services-caurosel',
  templateUrl: './services-caurosel.component.html',
  styleUrls: ['./services-caurosel.component.scss']
})
export class ServicesCauroselComponent implements OnInit {
  public carouselTileItems: Array<any> = [
    {
      icon: './assets/images/landing/services/service1.svg',
      text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
      title: 'France'
    },
    {
      icon: './assets/images/landing/services/services14.svg',
      text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
      title: 'Canada'
    }
  ];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    slide: 4,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  constructor() {}

  ngOnInit() {}
}
