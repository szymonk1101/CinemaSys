import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DescTruncatePipe } from './pipes/desc-truncate.pipe';
import { FilmshowMetaComponent } from './filmshow/filmshow-meta/filmshow-meta.component';



@NgModule({
  declarations: [
    DescTruncatePipe,
    FilmshowMetaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DescTruncatePipe,
    FilmshowMetaComponent
  ]
})
export class SharedModule { }
