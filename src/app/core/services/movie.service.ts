import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/ApiResult';
import { Movie } from '../models/Movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {

	private movies: Movie[];
	private movies$: Subject<Movie[]> = new Subject<Movie[]>();

	constructor(private http: HttpClient) {

	}
	
	add(movie: Movie): Observable<Movie> {
		return this.http.post<Movie>(environment.apiUrl + "/movie/", movie)
			.pipe(tap(
				(movie: Movie) => {
					this.movies.push(movie);
					this.movies$.next(this.movies);
				}
			));
	}

	update(movie: Movie): Observable<Movie> {
		return this.http.put<Movie>(environment.apiUrl + "/movie/" + movie.id, movie);
			/*.pipe(tap(
				(movie: Movie) => {
					this.movies.forEach((v: Movie, index: number) => {
						if(v.id == movie.id) {
							this.movies[index] = movie;
						}
					});
					this.movies$.next(this.movies);
					console.log("next");
				}
			));*/
	}

	detele(movie: Movie): Observable<ApiResult> {
		return this.http.delete<ApiResult>(environment.apiUrl + "/movie/" + movie.id, {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getById(id: number): Observable<Movie> {
		return this.http.get<Movie>(environment.apiUrl + "/movie/" + id, {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getAll(): Observable<Movie[]> {
		this.http.get<Movie[]>(environment.apiUrl + "/movie/all", {})
			.pipe(tap((x) => { console.log(x); }))
			.subscribe((movies) => { 
				this.movies = movies;
				this.movies$.next(this.movies);
		});

		return this.movies$;
	}
}
