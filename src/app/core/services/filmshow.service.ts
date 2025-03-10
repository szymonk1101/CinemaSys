import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Filmshow } from '../models/Filmshow';
import { ApiResult } from '../models/ApiResult';


@Injectable({
	providedIn: 'root'
})
export class FilmshowService {

	private filmshows: Filmshow[] = [];
	private filmshows$: Subject<Filmshow[]> = new Subject<Filmshow[]>();

	constructor(private http: HttpClient) { }

	add(filmshow: Filmshow): Observable<Filmshow> {
		return this.http.post<Filmshow>(environment.apiUrl + "/filmshow/", filmshow)
			.pipe(tap(
				(filmshow: Filmshow) => {
					this.filmshows.push(filmshow);
					this.filmshows$.next(this.filmshows);
				}
			));
	}

	update(filmshow: Filmshow): Observable<Filmshow> {
		return this.http.put<Filmshow>(environment.apiUrl + "/filmshow/" + filmshow.id, filmshow);
	};

	get(id: number): Observable<Filmshow> {
		return this.http.get<Filmshow>(environment.apiUrl + "/filmshow/" + id, {});
			//.pipe(
			//	tap((x) => { console.log(x); })
			//);
	}

	getAll(): Observable<Filmshow[]> {
		this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/all", {})
			.pipe(
				tap((x) => { console.log(x); })
			)
			.subscribe((filmshows) => { 
				this.filmshows = filmshows;
				this.filmshows$.next(this.filmshows);
		});

		return this.filmshows$;
	}

	getAllFuture(): Observable<Filmshow[]> {
		this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/allfuture", {})
			.pipe(
				tap((x) => { console.log(x); })
			)
			.subscribe((filmshows) => { 
				this.filmshows = filmshows;
				this.filmshows$.next(this.filmshows);
		});
		return this.filmshows$;
	}

	getByMovieId(movie_id: number): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/movie/"+ movie_id +"/filmshows", {})
			.pipe(
				tap((x) => { console.log(x); })
			);
	}

	getAllByMovieId(movie_id: number): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/movie/"+ movie_id +"/filmshows/all", {})
			.pipe(
				tap((x) => { console.log(x); })
			);
	}

	getToday(): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/today", {})
			.pipe(
				tap((x) => { console.log(x); })
			);
	}

	getByDate(date: string): Observable<Filmshow[]>
	{
		return this.http.get<Filmshow[]>(environment.apiUrl + "/filmshow/date/"+date, {})
			.pipe(
				tap((x) => { console.log(x); })
			);
	}

	// tickets
	buyTicket(filmshow: Filmshow, seat: number): Observable<ApiResult>
	{
		return this.http.post<ApiResult>(environment.apiUrl + "/filmshow/buy/"+filmshow.id+"/"+seat, filmshow)
			.pipe(tap(
				(result: ApiResult) => {
					console.log(result);
				}
			));
	}
}
