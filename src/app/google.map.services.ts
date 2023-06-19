import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class GoogleMapsApiService
{
  
  getPlaceDetails(placeId : string | undefined='' , map : any): void 
  {
    let service  = new google.maps.places.PlacesService(map);
    const request = {
      placeId: placeId,
      //fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
    };

    service?.getDetails(request, (results, status) => 
    {
      if (status === google.maps.places.PlacesServiceStatus.OK) 
      {
        //Json stringify result 
        console.log(JSON.stringify(results));
      }
      else 
      {
        console.error('Failed to Find Place Search Details:', status);
      }
    }
    );
  }
 
}