import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmshowService } from '../core/services/filmshow.service';

import { Filmshow } from '../core/models/Filmshow';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../core/services/toast.service';


@Component({
	selector: 'app-filmshow',
	templateUrl: './filmshow.component.html'
})
export class FilmshowComponent implements OnInit {

	loading: boolean = true;
	filmshows: Filmshow[];
	dateType: string = "today";
	now: Date = new Date();
	datePicker: NgbDateStruct; 

	constructor(private filmshowService: FilmshowService, public toastService: ToastService, private router: Router) { }

	ngOnInit(): void 
	{
		this.onChangeDate();
	}

	onAddFilmshow(filmshow: Filmshow): void 
	{
		console.log(filmshow);

		this.filmshowService.add(filmshow).subscribe({
			next: (filmshow: Filmshow) => {
				this.toastService.show("Nowy seans został pomyślnie dodany.", { classname: 'bg-success text-light', delay: 5000 });
			}
		});
	}

	onChangeDate(): void 
	{
		this.loading = true;
		this.filmshows = [];

		if(this.dateType == "today") {
			this.filmshowService.getToday().subscribe((filmshows) => {
				this.filmshows = filmshows;
				this.loading = false;
			});
		}
		else if(this.dateType == "all") {
			this.filmshowService.getAllFuture().subscribe((filmshows) => {
				this.filmshows = filmshows;
				this.loading = false;
			});
		}
		else if(this.dateType == "datepicker") {
			if(this.datePicker != undefined) {
				let date = this.datePicker.year+"-"+ ("0" + this.datePicker.month).slice(-2) + "-"+ ("0" + this.datePicker.day).slice(-2);
				
				this.filmshowService.getByDate(date).subscribe((filmshows) => {
					this.filmshows = filmshows;
					this.loading = false;
				});
			}
		}
	}

}
