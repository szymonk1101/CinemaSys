import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

	movie: Movie;
	filmshows: Filmshow[];

	constructor(private movieService: MovieService, private filmshowService: FilmshowService, private toastService: ToastService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: { movie: Movie }) => {
			this.movie = data.movie;
			this.loadFilmshows();
		});
	}

	onUpdateMovie(movie: Movie): void {
		this.movieService.update(movie).subscribe(
			(next: Movie) => {
				this.movie = next;
				this.toastService.show("Dane filmu zostały zaktualizowane.", { classname: 'bg-success text-light', delay: 5000 });
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
