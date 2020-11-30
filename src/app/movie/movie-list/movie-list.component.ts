import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/core/models/Movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {

	movies$: Observable<Movie[]>;

	constructor(private movieService: MovieService, private toastService: ToastService) {
		
		setTimeout(() => {
			this.movies$ = movieService.getAll(); 
		}, 1000);
	}

	ngOnInit(): void {
	}

	onAddMovie(movie: Movie): void {

		this.movieService.add(movie).subscribe({
			next: (movie: Movie) => {
				this.toastService.show("Nowy film został pomyślnie dodany.", { classname: 'bg-success text-light', delay: 5000 });
			}
		});
	}

}
