import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from 'src/app/core/models/Movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Injectable({
	providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<Movie> {

	constructor(private movieService: MovieService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		return this.movieService.getById(parseInt(route.paramMap.get('id')))
			.pipe(catchError((err) => this.router.navigate([])));
	}
}
