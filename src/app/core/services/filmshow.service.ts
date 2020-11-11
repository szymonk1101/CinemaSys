import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Filmshow } from '../models/Filmshow';


@Injectable({
  providedIn: 'root'
})
export class FilmshowService {

  constructor(private http: HttpClient) { }

  //get(id: number): Observable<Filmshow> {
  get(id: number) {
    return this.http.get('article', { 
      params: {
        "id": id.toString()
      }
    });
  }
}
