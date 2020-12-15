import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/core/models/ApiResult';

import { Movie } from 'src/app/core/models/Movie';
import { ImageService } from 'src/app/core/services/image.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {

	movies$: Observable<Movie[]>;

	constructor(private movieService: MovieService, private imageService: ImageService, private toastService: ToastService) { }

	ngOnInit(): void {
		this.movies$ = this.movieService.getAll(); 
	}

	onAddMovie(movie: Movie): void {
		if(movie.image != undefined && typeof movie.image !== "string") {
			this.imageService.uploadImage(movie.image as File).subscribe(
				(res: ApiResult) => {
					movie.image = res.data.shift();
					this.addMovie(movie);
				},
				() => {
					this.toastService.error("Wystąpił błąd podczas ładowania plakatu.");
				}
			);
		} else {
			this.addMovie(movie);
		}
	}

	private addMovie(movie: Movie): void {
		this.movieService.add(movie).subscribe({
			next: (movie: Movie) => {
				this.toastService.success("Nowy film został pomyślnie dodany.", { delay: 5000 });
			}
		});
	}

}
