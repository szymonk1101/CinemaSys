import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-movie-form-new',
	templateUrl: './movie-form-new.component.html',
})
export class MovieFormNewComponent implements OnInit {

	show: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	toggle(): void {
		this.show = !this.show;
	}

}
