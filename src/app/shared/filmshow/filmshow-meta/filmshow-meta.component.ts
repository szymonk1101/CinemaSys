import { Component, Input } from '@angular/core';
import { Filmshow } from 'src/app/core/models/Filmshow';


@Component({
	selector: 'app-filmshow-meta',
	templateUrl: './filmshow-meta.component.html'
})
export class FilmshowMetaComponent {

	@Input() filmshow: Filmshow;

	constructor() { }

}
