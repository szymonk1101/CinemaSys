import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { Movie } from 'src/app/core/models/Movie';
import { FilmshowService } from 'src/app/core/services/filmshow.service';

@Component({
	selector: 'app-movie-stats',
	templateUrl: './movie-stats.component.html'
})
export class MovieStatsComponent implements OnInit {

	@Input() movie: Movie;

	public show: boolean = false;
	public barChartOptions: ChartOptions = {
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					stepSize: 1,
					min: 0
				}
			}]
		}
	};
	public barChartLabels: Label[] = [];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];
	public barChartData: ChartDataSets[] = [
		{ data: [], label: 'Liczba sprzedanych biletów' }
	];

	private filmshows: Filmshow[];
	private chartData: number[] = [];
	

	constructor(
		private filmshowService: FilmshowService
	) { }

	ngOnInit(): void {
		if(this.movie) {
			this.filmshowService.getAllByMovieId(this.movie.id).subscribe((filmshows) => {
				this.filmshows = filmshows;
				this.calculateChartData();
			});
		}
	}

	public toggle(): void {
		this.show = !this.show;
	}

	private calculateChartData(): void {
		this.filmshows.forEach((filmshow: Filmshow) => {
			let date = filmshow.date.substring(0, 10);
			if(this.barChartLabels.indexOf(date) == -1) {
				this.barChartLabels.push(date);
				this.chartData.push(filmshow.occupied_seats.length);
			} else {
				this.chartData[this.barChartLabels.indexOf(date)] += filmshow.occupied_seats.length;
			}

		});
		this.barChartData = [{ data: this.chartData, label: 'Liczba sprzedanych biletów' }];
	}

}
