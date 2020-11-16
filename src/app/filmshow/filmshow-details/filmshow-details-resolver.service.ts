import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { FilmshowService } from 'src/app/core/services/filmshow.service';

@Injectable({ providedIn: 'root' })
export class FilmshowDetailsResolver implements Resolve<Filmshow> {
	constructor(private filmshowService: FilmshowService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		return this.filmshowService.get(parseInt(route.paramMap.get('id')))
			.pipe(catchError((err) => this.router.navigate(['/404', 'Wybrany seans nie istnieje.'])));
	}
}
