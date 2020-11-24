import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/core/models/Movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
	selector: 'app-movie-form-new',
	templateUrl: './movie-form-new.component.html',
})
export class MovieFormNewComponent implements OnInit {

	public show: boolean = false;
	public movieForm: FormGroup;
	public success_msg: string;
	private movie: Movie = {} as Movie;

	
	constructor(private movieService: MovieService) { }

	ngOnInit(): void {
		this.movieForm = new FormGroup({
			title: new FormControl(this.movie.title, [
				Validators.required,
				Validators.minLength(3)
			]),
			duration: new FormControl(this.movie.duration, [
				Validators.required, Validators.min(1)
			]),
			description: new FormControl(this.movie.description, Validators.required),
			image: new FormControl(this.movie.image)
		});
	}

	addMovieClick(event: MouseEvent)
	{
		if(this.movieForm.valid) {
			Object.assign(this.movie, this.movieForm.value);
			
			this.movieService.add(this.movie).subscribe({
				next: (movie: Movie) => {
					this.movieForm.reset();
					this.success_msg = "Nowy film został pomyślnie dodany.";
				}
			});
		} 
		else {
			console.log("Popraw");
		}
	}

	toggle(): void {
		this.show = !this.show;
	}

}
