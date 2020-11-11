import { Component, OnInit } from '@angular/core';
import { Filmshow } from 'src/app/core/models/Filmshow';

@Component({
  selector: 'app-filmshow-details',
  templateUrl: './filmshow-details.component.html'
})
export class FilmshowDetailsComponent implements OnInit {

  private filmshow: Filmshow;

  constructor() { }

  ngOnInit(): void {
    
  }

}
