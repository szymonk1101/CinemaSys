import { Movie } from './Movie';
import { Room } from './Room';

export interface Filmshow {
    id: number;
    movie: Movie;
    date: string; // data i godzina
    room: Room;
    occupied_seats: number[];
  }