import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/core/models/Movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {

	movies$: Observable<Movie[]>;

	constructor(private movieService: MovieService) {
		
		setTimeout(() => {
			this.movies$ = movieService.getAll(); 
		}, 1000);
		
		/*movies$.subscribe({
			next(movies: Movie[]) {
				console.log(movies);
				this.movies = movies;
			},
			error(err) {
				//router.navigate(['/404', 'Wybrany seans nie istnieje.']);
			}
		});*/
	}

	ngOnInit(): void {
	}

}
