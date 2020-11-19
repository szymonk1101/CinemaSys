import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormNewComponent } from './movie-form-new/movie-form-new.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
	declarations: [
		MovieDetailsComponent,
		MovieListComponent,
		MovieFormNewComponent
	],
	imports: [
		CommonModule,
		MovieRoutingModule,
		SharedModule
	]
})
export class MovieModule { }
