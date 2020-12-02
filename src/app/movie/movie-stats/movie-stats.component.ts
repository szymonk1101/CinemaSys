import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Filmshow } from 'src/app/core/models/Filmshow';
import { FilmshowService } from 'src/app/core/services/filmshow.service';

@Component({
	selector: 'app-movie-stats',
	templateUrl: './movie-stats.component.html'
})
export class MovieStatsComponent implements OnInit {

	private filmshows: Filmshow[];

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

	private chartData: number[] = [];

	public barChartData: ChartDataSets[] = [
		{ data: this.chartData, label: 'Liczba biletów' }
	];

	constructor(
		private filmshowService: FilmshowService
	) { }

	ngOnInit(): void {
		this.filmshowService.getAllByMovieId(6).subscribe((filmshows) => {
			this.filmshows = filmshows;
			this.calculateChartData();
		});
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
	}

}
