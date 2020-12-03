import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { FilmshowService } from 'src/app/core/services/filmshow.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-filmshow-details',
    templateUrl: './filmshow-details.component.html'
})
export class FilmshowDetailsComponent implements OnInit {

    filmshow: Filmshow;

    constructor(
        private filmshowService: FilmshowService, 
        private toastService: ToastService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: { filmshow: Filmshow }) => {
            this.filmshow = data.filmshow;
        });
    }

    onUpdateFilmshow(filmshow: Filmshow): void {
        this.filmshowService.update(filmshow).subscribe(
			(next: Filmshow) => {
				this.filmshow = next;
				this.toastService.show("Dane seansu zostały zaktualizowane.", { classname: 'bg-success text-light', delay: 5000 });
		});
    }
    
}
