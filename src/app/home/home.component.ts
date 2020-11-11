import { Component, OnInit } from '@angular/core';
import { Filmshow } from '../core/models/Filmshow';
import { Movie } from '../core/models/Movie';
import { Room } from '../core/models/Room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  filmshows: Filmshow[];

  constructor() {

    const piraci: Movie = {
      id: 1,
      title: 'Piraci z karaibów - Klątwa czarnej perły',
      description: 'Tutaj będzie fajny opis filmu',
      duration: 240
    };

    const szybcy: Movie = {
      id: 2,
      title: 'Szyby i wściekli 6',
      description: 'Tutaj będzie Szyby i wściekli 6 kozak film',
      duration: 180
    };

    const room1: Room = {
      num: 1,
      seats_cnt: 60
    };

    this.filmshows = [
      {
        id: 1,
        movie: piraci,
        date: new Date("2020-11-12 20:30"),
        room: room1,
        occupied_seats: []
      },
      {
        id: 2,
        movie: szybcy,
        date: new Date("2020-11-12 22:30"),
        room: room1,
        occupied_seats: []
      }

    ];

  }

  ngOnInit(): void {
  }

}
