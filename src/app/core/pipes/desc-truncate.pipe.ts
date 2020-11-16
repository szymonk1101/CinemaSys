import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'descTruncate'
})
export class DescTruncatePipe implements PipeTransform {

	transform(txt: string, limit: number): string {
		if(txt.length <= limit) return txt;
		txt = txt.substring(0, limit-3).trimEnd();
		let lastC = txt[txt.length-1];
		if(lastC != '.' && lastC != '!' && lastC != '?') {
			txt += "...";
		}
		return  txt;
	}

}
