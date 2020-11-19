import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmshowService } from '../core/services/filmshow.service';

import { Filmshow } from '../core/models/Filmshow';
import { Movie } from '../core/models/Movie';
import { Room } from '../core/models/Room';


@Component({
	selector: 'app-filmshow',
	templateUrl: './filmshow.component.html',
	styles: [
	]
})
export class FilmshowComponent implements OnInit {

	loading: boolean = true;
	filmshows: Filmshow[];

	constructor(private filmshowService: FilmshowService, private router: Router) {

		const film$: Observable<Filmshow> = filmshowService.get(5);
		film$.subscribe({
			next(film: Filmshow) {
				console.log(film);
			},
			error(err) {
				//router.navigate(['/404', 'Wybrany seans nie istnieje.']);
			}
		});

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
				date: "2020-11-12T19:30:00.000Z",
				room: room1,
				occupied_seats: []
			},
			{
				id: 2,
				movie: szybcy,
				date: "2020-11-12T19:30:00.000Z",
				room: room1,
				occupied_seats: []
			}

		];

		this.loading = false;

	}

	ngOnInit(): void {
	}

}
