import { Component, OnInit , inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsApiService } from '../places.services';
import { Restaurant } from '../restaurant';
import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';

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
  slideIndex = 0;


  constructor(private router: Router) {}
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
      this.placeId = this.route.snapshot.paramMap.get('place_id') || '';
      console.log("place id "+this.placeId);
      this.service.getPlaceDetails(this.placeId, this.map).then((restaurant) => {
        this.restaurant = restaurant;
        console.log(this.restaurant);
      }).catch((error) => {
        console.log(error);
      });
    });

   
  }
  navigateToParent() {
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }
  changeSlide(n: number) {
    const slides = document.getElementsByClassName("slideshow-image");
    this.slideIndex += n;

    if (this.slideIndex >= slides.length) {
      this.slideIndex = 0;
    } else if (this.slideIndex < 0) {
      this.slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    slides[this.slideIndex].classList.add("active");
  }
  


}
