import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmshowComponent } from './filmshow.component';
import { FilmshowResolver } from './filmshow-resolver.service';
import { FilmshowDetailsComponent } from './filmshow-details/filmshow-details.component';
import { FilmshowBuyComponent } from './filmshow-buy/filmshow-buy.component';

const routes: Routes = [

	{ path: '', component: FilmshowComponent },
	{ path: 'details/:id', component: FilmshowDetailsComponent, resolve: { filmshow: FilmshowResolver }, data: { breadcrumb: 'Szczegóły seansu' } },
	{ path: 'buy/:id', component: FilmshowBuyComponent, resolve: { filmshow: FilmshowResolver }, data: { breadcrumb: 'Kup bilet' } }

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FilmshowRoutingModule { }
