import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmshowService } from '../core/services/filmshow.service';

import { Filmshow } from '../core/models/Filmshow';


@Component({
	selector: 'app-filmshow',
	templateUrl: './filmshow.component.html'
})
export class FilmshowComponent implements OnInit {

	loading: boolean = true;
	filmshows: Filmshow[];

	constructor(private filmshowService: FilmshowService, private router: Router) {

		filmshowService.getAll().subscribe((filmshows) => {
			this.filmshows = filmshows;
			this.loading = false;
		});

	}

	ngOnInit(): void {
	}

}
