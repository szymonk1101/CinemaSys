import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailsResolver } from './movie-details/movie-details-resolver.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [

	{ path: 'details/:id', component: MovieDetailsComponent, resolve: { movie: MovieDetailsResolver }, data: { breadcrumb: 'Szczegół filmu' } },
	{ path: '', component: MovieListComponent }

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MovieRoutingModule { }
