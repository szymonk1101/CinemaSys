import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { FilmshowRoutingModule } from './filmshow-routing.module';
import { FilmshowComponent } from './filmshow.component';
import { FilmshowDetailsComponent } from './filmshow-details/filmshow-details.component';
import { FilmshowPreviewComponent } from './filmshow-preview/filmshow-preview.component';
import { FilmshowFormComponent } from './filmshow-form/filmshow-form.component';

@NgModule({
  declarations: [
    FilmshowComponent,
    FilmshowDetailsComponent,
    FilmshowPreviewComponent,
    FilmshowFormComponent
  ],
  imports: [
    CommonModule,
    FilmshowRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FilmshowModule { }
