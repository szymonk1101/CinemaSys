import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Movie } from 'src/app/core/models/Movie';
import { ImageService } from 'src/app/core/services/image.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
})
export class MovieFormComponent implements OnInit {

	@Input() bindMovie: Movie = {} as Movie;
	@Input() buttonText: string = "Dodaj film";
	@Output() onSubmitForm = new EventEmitter<Movie>();

	public show: boolean = false;
	public movieForm: FormGroup;
	private image: File;
	public success_msg: string;
	
	constructor(private imageService: ImageService, private toastService: ToastService) { }

	ngOnInit(): void {
		this.movieForm = new FormGroup({
			title: new FormControl(this.bindMovie.title, [
				Validators.required,
				Validators.minLength(3)
			]),
			duration: new FormControl(this.bindMovie.duration, [
				Validators.required, Validators.min(1)
			]),
			description: new FormControl(this.bindMovie.description, Validators.required),
			image: new FormControl()
		});
	}

	submitMovieFormClick()
	{
		if(this.movieForm.valid) {
			//Object.assign(this.bindMovie, this.movieForm.value);
			this.bindMovie.title = this.movieForm.value.title;
			this.bindMovie.description = this.movieForm.value.description;
			this.bindMovie.duration = this.movieForm.value.duration;
			if(this.image) {
				this.bindMovie.image = this.image;
			}

			this.onSubmitForm.emit(this.bindMovie);
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

	processFile(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();

		this.image = file;

		/*reader.addEventListener('load', (event: any) => {

			let selectedFile = new ImageSnippet(event.target.result, file);

			console.log(selectedFile);
			/*this.imageService.uploadImage(selectedFile.file).subscribe(
				(res) => {
					console.log(res);
				},
				(err) => {

				})
		});

		reader.readAsDataURL(file);*/
	}

}

/*class ImageSnippet {
	constructor(public src: string, public file: File) { }
}*/
