import { Component, OnInit , inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsApiService } from '../places.services';
import { Restaurant } from '../restaurant';
import { Loader } from '@googlemaps/js-api-loader';
@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  map: google.maps.Map | undefined;
  service: GoogleMapsApiService = inject(GoogleMapsApiService);
  placeId: string | undefined;
  restaurant: Restaurant | undefined;


  ngOnInit() {

    const loader = new Loader({
      apiKey: 'AIzaSyD_N63Ju65PKL0xqCyqBsNCvIw38MBTCGg',
      libraries: ['places'],
    });
    loader.load().then(() => {

      console.log('google.maps ready');
      //todo:after : add location with marker with the map , pass them using routing service 
      this.map = new google.maps.Map( document.getElementById('map') as HTMLElement, {
        center: { lat: 45.760795414609724, lng: 4.838903326244934 },
        zoom: 8
      });
      this.service.getPlaceDetails(this.placeId, this.map).then((restaurant) => {
        console.log(restaurant);
        this.restaurant = restaurant;
      }).catch((error) => {
        console.log(error);
      });
    });

   
  }


}
