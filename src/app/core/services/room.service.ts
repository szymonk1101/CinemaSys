import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Room } from '../models/Room';

@Injectable({
	providedIn: 'root'
})
export class RoomService {

	constructor(private http: HttpClient) {

	}
	
	getAll(): Observable<Room[]> {
		return this.http.get<Room[]>(environment.apiUrl + "/room/all", {})
			.pipe(tap((x) => { console.log(x); }));
			/*.subscribe((movies) => { 
				this.movies = movies;
				this.movies$.next(this.movies);
			})*/
	}
}
