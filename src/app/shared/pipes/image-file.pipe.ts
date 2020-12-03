import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
	name: 'imageFile'
})
export class ImageFilePipe implements PipeTransform {

	transform(name: string): unknown {
		if(name) {
			return environment.fileUrl + name;
		} else {
			return 'assets/img/movie.png';
		}
	}
}
