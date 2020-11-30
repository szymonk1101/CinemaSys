import { Component, Input, OnInit } from '@angular/core';
import { Filmshow } from 'src/app/core/models/Filmshow';

@Component({
  selector: 'app-filmshow-preview',
  templateUrl: './filmshow-preview.component.html'
})
export class FilmshowPreviewComponent {

  @Input() filmshow: Filmshow;

  now = new Date().toISOString();

}
