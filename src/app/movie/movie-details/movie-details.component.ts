import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from 'src/app/core/models/ApiResult';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { ImageService } from 'src/app/core/services/image.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { MovieStatsComponent } from '../movie-stats/movie-stats.component';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

	@ViewChild('confirmmodal') confirmmodal: NgbActiveModal;

	movie: Movie;
	filmshows: Filmshow[];

	constructor(
		private movieService: MovieService, 
		private filmshowService: FilmshowService, 
		private imageService: ImageService,
		private toastService: ToastService, 
		private router: Router,
		private route: ActivatedRoute,
		private modalsService: NgbModal
	) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: { movie: Movie }) => {
			this.movie = data.movie;
			this.loadFilmshows();
		});
	}

	onUpdateMovie(movie: Movie): void {
		if(typeof movie.image !== "string") {
			this.imageService.uploadImage(movie.image as File).subscribe(
				(res: ApiResult) => {
					movie.image = res.data.shift();
					this.updateMovie(movie);
				},
				() => {
					this.toastService.error("Wystąpił błąd podczas ładowania plakatu.");
				}
			);
		} else {
			this.updateMovie(movie);
		}
	}

	onDeleteMovie(): void {
		this.modalsService.open(this.confirmmodal).closed.subscribe((value: string) => {
			if(value == "delete") {
				
				this.movieService.detele(this.movie).subscribe((result: ApiResult) => {
					this.toastService.success("Film został pomyślnie usunięty.");
					this.router.navigate(['/movie']);
				});

			}
		});
	}

	private updateMovie(movie: Movie): void {
		this.movieService.update(movie).subscribe(
			(next: Movie) => {
				this.movie = next;
				this.toastService.show("Dane filmu zostały zaktualizowane.", { classname: 'bg-success text-light', delay: 5000 });
		});
	}

	private loadFilmshows(): void {
		//setTimeout(() => {
			this.filmshowService.getByMovieId(this.movie.id).subscribe((movies) => {
				this.filmshows = movies;
			});
		//}, 1000);
	}

}
