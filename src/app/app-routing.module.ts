import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [

	{ path: '', redirectTo: 'filmshow', pathMatch: 'full' },

	{ path: 'filmshow', loadChildren: () => import('./filmshow/filmshow.module').then(m => m.FilmshowModule), data: { breadcrumb: 'Seanse' } },

	{ path: 'movie', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule), data: { breadcrumb: 'Filmy' } },

	{ path: '404/:error', component: PageNotFoundComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		preloadingStrategy: PreloadAllModules
	})],
	exports: [RouterModule, RouterLink]
})
export class AppRoutingModule { }
