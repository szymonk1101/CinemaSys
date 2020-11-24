import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Filmshow } from '../models/Filmshow';


@Injectable({
	providedIn: 'root'
})
export class FilmshowService {

	constructor(private http: HttpClient) { }

	get(id: number): Observable<Filmshow> {
		return this.http.get<Filmshow>(environment.apiUrl + "/filmshow/" + id, {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getAll(): Observable<Filmshow[]> {
		return this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/all", {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getByMovieId(movie_id: number): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/movie/"+ movie_id +"/filmshows", {})
			.pipe(tap((x) => { console.log(x); }));
	}
}
