import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmshowComponent } from './filmshow.component';
import { FilmshowDetailsResolver } from './filmshow-details/filmshow-details-resolver.service';
import { FilmshowDetailsComponent } from './filmshow-details/filmshow-details.component';

const routes: Routes = [

	{ path: '', component: FilmshowComponent },
	{ path: 'details/:id', component: FilmshowDetailsComponent, resolve: { filmshow: FilmshowDetailsResolver }, data: { breadcrumb: 'Szczegóły seansu' } },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FilmshowRoutingModule { }
