import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class GoogleMapsApiService
{
  private apiUrl = '/api/place/details/json';
  private apiKey = 'AIzaSyAiA-lVfOcpy8DkqPEhL09ueJtCNe1vvbU';

  constructor(private http: HttpClient) { }

  getPlaceDetails(placeId: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyAiA-lVfOcpy8DkqPEhL09ueJtCNe1vvbU`;
    return this.http.get<any>(url);
  }
 
}