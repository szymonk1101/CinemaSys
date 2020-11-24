import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Filmshow, FilmshowInsert } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { Room } from 'src/app/core/models/Room';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
	selector: 'app-filmshow-form-new',
	templateUrl: './filmshow-form-new.component.html'
})
export class FilmshowFormNewComponent implements OnInit {

	public show: boolean = false;
	public filmshowForm: FormGroup;
	public success_msg: string;
	public movies$: Observable<Movie[]>;
	public rooms$: Observable<Room[]>;
	private filmshow: FilmshowInsert = {} as FilmshowInsert;

	constructor(private filmshowService: FilmshowService,
		private movieService: MovieService,
		private roomService: RoomService) {

			this.movies$ = this.movieService.getAll();
			this.rooms$ = this.roomService.getAll();
		}

	ngOnInit() {
		this.filmshowForm = new FormGroup({
			movie_id: new FormControl(this.filmshow.movie_id, [
				Validators.required
			]),
			date: new FormControl(this.filmshow.date, [
				Validators.required
			]),
			room_id: new FormControl(this.filmshow.room_id, Validators.required)
		});
	}

	addFilmshowClick(event: MouseEvent)
	{
		if(this.filmshowForm.valid) {
			Object.assign(this.filmshow, this.filmshowForm.value);
			console.log(this.filmshow);
			this.filmshowService.add(this.filmshow).subscribe({
				next: (filmshow: Filmshow) => {
					this.filmshowForm.reset();
					this.success_msg = "Nowy seans został pomyślnie dodany.";
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
