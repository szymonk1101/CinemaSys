import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { FilmshowDetailsComponent } from './filmshow/filmshow-details/filmshow-details.component';
import { FilmshowDetailsResolver } from './filmshow/filmshow-details/filmshow-details-resolver.service';

import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieDetailsResolver } from './movie/movie-details/movie-details-resolver.service';
import { MovieListComponent } from './movie/movie-list/movie-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filmshow/details/:id', component: FilmshowDetailsComponent, resolve: { filmshow: FilmshowDetailsResolver } },

  { path: 'movie/details/:id', component: MovieDetailsComponent, resolve: { movie: MovieDetailsResolver } },
  { path: 'movie', component: MovieListComponent },

  { path: '404/:error', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterLink]
})
export class AppRoutingModule { }
