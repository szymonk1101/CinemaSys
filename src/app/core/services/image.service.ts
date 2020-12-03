import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/ApiResult';

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private http: HttpClient) { }

	public uploadImage(image: File): Observable<ApiResult> {
		const formData = new FormData();

		formData.append('image', image);

		return this.http.post<ApiResult>(environment.apiUrl + "/file", formData);
	}

}
