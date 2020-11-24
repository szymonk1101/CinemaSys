import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { FilmshowService } from 'src/app/core/services/filmshow.service';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

	movie: Movie;
	filmshows: Filmshow[];

	constructor(private filmshowService: FilmshowService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: { movie: Movie }) => {
			this.movie = data.movie;
			this.loadFilmshows();
		});
	}

	private loadFilmshows() {
		setTimeout(() => {
			this.filmshowService.getByMovieId(this.movie.id).subscribe((movies) => {
				this.filmshows = movies;
			});
		}, 1000);
	}

}
