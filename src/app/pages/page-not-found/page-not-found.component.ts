import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

  error_description$: Observable<string>;

  constructor(private route: ActivatedRoute) { 

    this.error_description$ = this.route.params.pipe(map(params => params.error ));

  }
}
