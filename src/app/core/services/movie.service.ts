import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {

	constructor(private http: HttpClient) { }

	getById(id: number): Observable<Movie> {
		return this.http.get<Movie>(environment.apiUrl + "/movie/" + id, {})
			.pipe(tap((x) => { console.log(x); }));
	}

	getAll(): Observable<Movie[]> {
		return this.http.get<Movie[]>(environment.apiUrl + "/movie/all", {})
			.pipe(tap((x) => { console.log(x); }));
	}
}
