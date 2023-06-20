import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsApiService {
  getPlaceDetails(placeId: string | undefined = '', map: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        placeId: placeId,
      };

      service?.getDetails(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results !== null) {
            const strarr = results?.photos?.map((photo) => photo.getUrl());
            const res = this.convertToRestaurant(results, strarr || []);
            console.log(res.photos);
            resolve(res);
          } else {
            reject(new Error('Place Details not found'));
          }
        } else {
          reject(new Error('Failed to Find Place Details: ' + status));
        }
      });
    });
  }


  convertToRestaurant(jsonObj: any, strarr: string[]): Restaurant {
    const restaurant: Restaurant = {
      address_components: jsonObj.address_components || [],
      adr_address: jsonObj.adr_address || '',
      business_status: jsonObj.business_status || '',
      current_opening_hours: jsonObj.current_opening_hours || {},
      formatted_address: jsonObj.formatted_address || '',
      formatted_phone_number: jsonObj.formatted_phone_number || '',
      geometry: jsonObj.geometry || {},
      icon: jsonObj.icon || '',
      icon_background_color: jsonObj.icon_background_color || '',
      icon_mask_base_uri: jsonObj.icon_mask_base_uri || '',
      international_phone_number: jsonObj.international_phone_number || '',
      name: jsonObj.name || '',
      opening_hours: jsonObj.opening_hours || {},
      photos: strarr ,
      place_id: jsonObj.place_id || '',
      plus_code: jsonObj.plus_code || {},
      price_level: jsonObj.price_level || 0,
      rating: jsonObj.rating || 0,
      reference: jsonObj.reference || '',
      reviews: jsonObj.reviews || [],
      types: jsonObj.types || [],
      url: jsonObj.url || '',
      user_ratings_total: jsonObj.user_ratings_total || 0,
      utc_offset: jsonObj.utc_offset || 0,
      utc_offset_minutes: jsonObj.utc_offset_minutes || 0,
      vicinity: jsonObj.vicinity || '',
      website: jsonObj.website || '',
    };
    
    //console.log(restaurant.photos);
    return restaurant;
  }

 
}
