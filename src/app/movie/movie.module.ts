import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieRoutingModule } from './movie-routing.module';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieStatsComponent } from './movie-stats/movie-stats.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
	declarations: [
		MovieDetailsComponent,
		MovieListComponent,
		MovieFormComponent,
		MovieStatsComponent
	],
	imports: [
		CommonModule,
		MovieRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		ChartsModule
	]
})
export class MovieModule { }
