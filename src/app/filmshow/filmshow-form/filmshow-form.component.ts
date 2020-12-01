import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { Room } from 'src/app/core/models/Room';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { RoomService } from 'src/app/core/services/room.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-filmshow-form',
	templateUrl: './filmshow-form.component.html'
})
export class FilmshowFormComponent implements OnInit {

	@Input() buttonText = "Dodaj seans";
	@Output() onSubmitForm = new EventEmitter<Filmshow>();

	public show: boolean = false;
	public filmshowForm: FormGroup;
	public movies$: Observable<Movie[]>;
	public rooms$: Observable<Room[]>;
	private filmshow: Filmshow = {} as Filmshow;
	public datepicker: NgbDateStruct;
	public timepicker: NgbTimeStruct = { hour: 12, minute: 0 } as NgbTimeStruct;

	constructor(private filmshowService: FilmshowService,
		private movieService: MovieService,
		private roomService: RoomService,
		public toastService: ToastService) {

			this.movies$ = this.movieService.getAll();
			this.rooms$ = this.roomService.getAll();
		}

	ngOnInit() {
		this.filmshowForm = new FormGroup({
			movie: new FormControl(this.filmshow.movie, [
				Validators.required
			]),
			datepicker: new FormControl(this.datepicker, [
				Validators.required
			]),
			timepicker: new FormControl(this.timepicker, [
				Validators.required
			]),
			room: new FormControl(this.filmshow.room, Validators.required)
		});
	}

	submitFilmshowFormClick()
	{
		if(this.filmshowForm.valid) {

			this.filmshow.movie = this.filmshowForm.value.movie as Movie;
			this.filmshow.room = this.filmshowForm.value.room as Room;
			this.filmshow.date = `${this.datepicker.year}-${this.datepicker.month}-${this.datepicker.day} ${this.timepicker.hour}:${this.timepicker.minute}`;
			
			this.onSubmitForm.emit(this.filmshow);
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
		this.filmshowForm.reset();
	}

}
