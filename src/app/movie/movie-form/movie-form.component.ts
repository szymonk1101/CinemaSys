import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/core/models/Movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
})
export class MovieFormComponent implements OnInit {

	@Input() bindMovie?: Movie;
	@Input() buttonText = "Dodaj film";
	@Output() onSubmitForm = new EventEmitter<Movie>();

	public show: boolean = false;
	public movieForm: FormGroup;
	public success_msg: string;
	private movie: Movie = {} as Movie;

	
	constructor(private movieService: MovieService, private toastService: ToastService) { }

	ngOnInit(): void {
		if(this.bindMovie) {
			this.movie = this.bindMovie;
		}

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

	submitMovieFormClick()
	{
		if(this.movieForm.valid) {
			Object.assign(this.movie, this.movieForm.value);
			
			this.onSubmitForm.emit(this.movie);
			this.show = false;
		} 
		else {
			this.toastService.show("Popraw dane w formularzu.", { classname: 'bg-danger text-light', delay: 5000 });
		}
	}

	toggle(): void {
		this.show = !this.show;
	}

	reset(): void {
		this.movieForm.reset();
	}

}
