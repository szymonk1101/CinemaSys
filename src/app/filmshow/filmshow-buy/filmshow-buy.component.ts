import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResult } from 'src/app/core/models/ApiResult';
import { Filmshow } from 'src/app/core/models/Filmshow';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { RoomService } from 'src/app/core/services/room.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-filmshow-buy',
	templateUrl: './filmshow-buy.component.html'
})
export class FilmshowBuyComponent implements OnInit {

	filmshow: Filmshow;
	seats = [];
	occupied_seats = [];
	seat: number;
	termss: boolean;

	constructor(
		private route: ActivatedRoute, 
		private router: Router,
		private filmshowService: FilmshowService, 
		private roomService: RoomService, 
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.route.data.subscribe((data: { filmshow: Filmshow }) => {
			this.filmshow = data.filmshow;
			this.occupied_seats = this.filmshow.occupied_seats;
			this.seats = this.roomService.getRoomSeatsArray(this.filmshow.room.seats_cnt);
		});
	}

	onBuyClick(): void {

		this.filmshowService.buyTicket(this.filmshow, this.seat).subscribe(
			(result: ApiResult) => {
				this.toastService.success(result.message);
				this.router.navigate(['/']);
			},
			(error: any) => {
				this.toastService.error(error.error.message);
			}
		);
	}

}
