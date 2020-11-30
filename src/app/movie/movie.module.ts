import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieRoutingModule } from './movie-routing.module';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
	declarations: [
		MovieDetailsComponent,
		MovieListComponent,
		MovieFormComponent
	],
	imports: [
		CommonModule,
		MovieRoutingModule,
		SharedModule,
		ReactiveFormsModule
	]
})
export class MovieModule { }
