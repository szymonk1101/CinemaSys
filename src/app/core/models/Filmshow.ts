import { Movie } from './Movie';
import { Room } from './Room';

export interface Filmshow {
	id: number;
	movie: Movie;
	date: string; // data i godzina
	room: Room;
	occupied_seats: number[];
}

export interface FilmshowInsert {
	movie_id: number;
	date: string;
	room_id: number;
}