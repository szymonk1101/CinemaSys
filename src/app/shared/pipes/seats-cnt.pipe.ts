import { Pipe, PipeTransform } from '@angular/core';
import { Filmshow } from 'src/app/core/models/Filmshow';

@Pipe({
	name: 'seatsCnt'
})
export class SeatsCntPipe implements PipeTransform {

	transform(filmshow: Filmshow): number {
		return filmshow.room.seats_cnt - filmshow.occupied_seats.length;
	}

}
