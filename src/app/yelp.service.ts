import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,  HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class YelpService {

  private apiKey = 'Oxu-BENWJf9BsPQVbvKpkMbwI4M0sARgLqHEL7LBzHlIfdq-NaYq5z5nMkR959bSerkH1eHVENqowswqb8S61dtH2fR7ydj6jrIut1NXovp6zBdPGEoo3hf8hdaNZHYx';
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

  constructor(private http: HttpClient) { }

  searchRestaurants(term: string, location: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      }),
      params: new HttpParams()
        .set('term', term)
        .set('location', location)
    };

    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}