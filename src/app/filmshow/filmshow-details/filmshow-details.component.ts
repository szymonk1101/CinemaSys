import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filmshow } from 'src/app/core/models/Filmshow';

@Component({
  selector: 'app-filmshow-details',
  templateUrl: './filmshow-details.component.html'
})
export class FilmshowDetailsComponent implements OnInit {

  filmshow: Filmshow;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { filmshow: Filmshow }) => {
      this.filmshow = data.filmshow;
    });
  }

}
