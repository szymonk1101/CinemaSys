import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescTruncatePipe } from './pipes/desc-truncate.pipe';


@NgModule({
  declarations: [
    DescTruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DescTruncatePipe
  ]
})
export class SharedModule { }
