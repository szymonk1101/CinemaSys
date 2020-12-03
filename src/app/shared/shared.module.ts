import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DescTruncatePipe } from './pipes/desc-truncate.pipe';
import { FilmshowMetaComponent } from './filmshow/filmshow-meta/filmshow-meta.component';
import { SeatsCntPipe } from './pipes/seats-cnt.pipe';
import { ImageFilePipe } from './pipes/image-file.pipe';



@NgModule({
  declarations: [
    DescTruncatePipe,
    SeatsCntPipe,
    ImageFilePipe,
    FilmshowMetaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DescTruncatePipe,
    SeatsCntPipe,
    ImageFilePipe,
    FilmshowMetaComponent,
    NgbModule
  ]
})
export class SharedModule { }
