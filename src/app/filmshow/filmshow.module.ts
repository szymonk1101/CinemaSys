import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FilmshowRoutingModule } from './filmshow-routing.module';
import { FilmshowComponent } from './filmshow.component';
import { FilmshowDetailsComponent } from './filmshow-details/filmshow-details.component';
import { FilmshowPreviewComponent } from './filmshow-preview/filmshow-preview.component';

@NgModule({
  declarations: [
    FilmshowComponent,
    FilmshowDetailsComponent,
    FilmshowPreviewComponent
  ],
  imports: [
    CommonModule,
    FilmshowRoutingModule,
    SharedModule
  ]
})
export class FilmshowModule { }
