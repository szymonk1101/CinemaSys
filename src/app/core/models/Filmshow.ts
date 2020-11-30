import { Movie } from './Movie';
import { Room } from './Room';

export interface Filmshow {
	readonly id?: number;
	movie: Movie;
	date: string; // data i godzina
	room: Room;
	occupied_seats: number[];
}

/*export class Filmshow {
	private _id?: number;
	private _movie: Movie;
	private _date: string; // data i godzina
	private _room: Room;
	private _occupied_seats: number[];


	constructor(filmshow: IFilmshow) {
		this._id = (filmshow.id != undefined) ? filmshow.id : undefined;
		this._movie = filmshow.movie;
		this._date = filmshow.date;
		this._room = filmshow.room;
		this._occupied_seats = filmshow.occupied_seats;
	}
	
	constructor(id: number = undefined, movie: Movie, date: string, room: Room, occupied_seats: number[]) {
		this._id = id;
		this._movie = movie;
		this._date = date;
		this._room = room;
		this._occupied_seats = occupied_seats;
	}

	public getFreeSeatsCnt(): number {
		return this._room.seats_cnt - this._occupied_seats.length;
	}

	public get id(): number {
		return this._id;
	}

	public get movie(): Movie {
		return this._movie;
	}

	public set movie(movie: Movie) {
		this._movie = movie;
	}

	public get date(): string {
		return this._date;
	}

	public set date(date: string) {
		this._date = date;
	}
	
	public setDate(date: Date) {
		// TO DO
	}

	public get room(): Room {
		return this._room;
	}

	public set room(room: Room) {
		this._room = room;
	}

	public get occupied_seats(): number[] {
		return this.occupied_seats;
	}
}*/