import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Filmshow, FilmshowInsert } from '../models/Filmshow';


@Injectable({
	providedIn: 'root'
})
export class FilmshowService {

	private filmshows: Filmshow[];
	private filmshows$: Subject<Filmshow[]> = new Subject<Filmshow[]>();

	constructor(private http: HttpClient) { }

	add(filmshow: FilmshowInsert): Observable<Filmshow> {
		return this.http.post<Filmshow>(environment.apiUrl + "/filmshow/", filmshow)
			.pipe(tap(
				(filmshow: Filmshow) => {
					this.filmshows.push(filmshow);
					this.filmshows$.next(this.filmshows);
				}
			));
	}

	get(id: number): Observable<Filmshow> {
		return this.http.get<Filmshow>(environment.apiUrl + "/filmshow/" + id, {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getAll(): Observable<Filmshow[]> {
		this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/all", {})
			.pipe(tap((x) => { console.log(x); }))
			.subscribe((filmshows) => { 
				this.filmshows = filmshows;
				this.filmshows$.next(this.filmshows);
		});

		return this.filmshows$;
	}

	getByMovieId(movie_id: number): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/movie/"+ movie_id +"/filmshows", {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getBetweenDates(start: Date, end: Date): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/between/"+start.toISOString()+"/"+end.toISOString(), {})
			.pipe(tap((x) => { console.log(x); }));
	}
}
