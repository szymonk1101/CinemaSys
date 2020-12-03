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

	@Input() bindFilmshow: Filmshow = {} as Filmshow;
	@Input() buttonText = "Dodaj seans";
	@Output() onSubmitForm = new EventEmitter<Filmshow>();

	public show: boolean = false;
	public filmshowForm: FormGroup;
	public movies$: Observable<Movie[]>;
	public rooms$: Observable<Room[]>;
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
		if(this.bindFilmshow.date) {
			let date = new Date(this.bindFilmshow.date);
			this.datepicker = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
			this.timepicker = {hour: date.getHours(), minute: date.getMinutes(), second: 0};
		}
		
		this.filmshowForm = new FormGroup({
			movie: new FormControl(this.bindFilmshow.movie, [
				Validators.required
			]),
			datepicker: new FormControl(this.datepicker, [
				Validators.required
			]),
			timepicker: new FormControl(this.timepicker, [
				Validators.required
			]),
			room: new FormControl(this.bindFilmshow.room, Validators.required)
		});
	}

	submitFilmshowFormClick()
	{
		if(this.filmshowForm.valid) {

			this.bindFilmshow.movie = this.filmshowForm.value.movie as Movie;
			this.bindFilmshow.room = this.filmshowForm.value.room as Room;
			this.bindFilmshow.date = `${this.datepicker.year}-${this.datepicker.month}-${this.datepicker.day} ${this.timepicker.hour}:${this.timepicker.minute}`;
			
			console.log(this.bindFilmshow);
			this.onSubmitForm.emit(this.bindFilmshow);
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

	compareMovies(m1: Movie, m2?: Movie): boolean {
		if(m2 && m1.id == m2.id) {
			return true;
		}
		return false;
	}

	compareRooms(r1: Room, r2?: Room): boolean {
		if(r2 && r1.num == r2.num) {
			return true;
		}
		return false;
	}

	onDatePickerChange(): void {
		if(this.datepicker)
			this.bindFilmshow.date = new Date(`${this.datepicker.year}-${this.datepicker.month}-${this.datepicker.day} ${this.timepicker.hour}:${this.timepicker.minute}`).toISOString();
	}
}
