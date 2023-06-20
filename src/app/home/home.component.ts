import { Component, OnInit , Inject } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsApiService } from '../places.services';
import { Restaurant } from '../restaurant';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnInit 
{
  title = 'google-maps';
  public map: google.maps.Map | undefined;
  public placesService: google.maps.places.PlacesService | undefined;
  public restaurants: google.maps.places.PlaceResult[] = [];
  public restaurants_real:Restaurant[] = [];
  public markers: google.maps.Marker[] = [];
  constructor(@Inject(GoogleMapsApiService) private googleMapsApiService: GoogleMapsApiService) { }

  ngOnInit() {
    
    const loader = new Loader({
      apiKey: 'AIzaSyD_N63Ju65PKL0xqCyqBsNCvIw38MBTCGg',
      libraries: ['places'],
    });
    loader.load().then(() => {
      console.log('google.maps ready');
      this.initializeMap();
      this.initializeAutocomplete();
    });
  }

  initializeMap() {
    const location = { lat: 45.760795414609724, lng: 4.838903326244934 };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: location,
        zoom: 8
      }
    );

    this.placesService = new google.maps.places.PlacesService(this.map);
  }

  initializeAutocomplete() {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.map?.setCenter(place.geometry.location);
        this.map?.setZoom(15);

        this.searchNearbyRestaurants(place.geometry.location);
      }
    });
  }

  applyFilters() {
    const ranked_by = (document.getElementById('ranked-by') as HTMLSelectElement).value;
    const minprice = (document.getElementById('min-price-filter') as HTMLSelectElement).value;
    const maxprice = (document.getElementById('max-price-filter') as HTMLSelectElement).value;
    const type = (document.getElementById('type-filter') as HTMLInputElement).value;
    
    const filterOptions: any = {};
    
    if (ranked_by) {
      filterOptions.rating = ranked_by;
    }
    
    if (maxprice) {
      filterOptions.maxPriceLevel = parseInt(maxprice, 10);
    }
    
    if (minprice) {
      filterOptions.minPriceLevel = parseInt(minprice, 10);
    }
    
    if (type) {
      filterOptions.type = type;
    }
  
    const input = document.getElementById('search-input') as HTMLInputElement;
    const place = (input.value && this.map?.getCenter()) ? { geometry: { location: this.map?.getCenter() } } : null;
    if (place && place.geometry && place.geometry.location) {
      this.map?.setCenter(place.geometry.location);
      this.map?.setZoom(15);
      this.clearMarkers(); 
      this.searchNearbyRestaurants(place.geometry.location, filterOptions);
    }
  }
  
  

  searchNearbyRestaurants(location: google.maps.LatLng, filterOptions?: any) {
    this.restaurants = [];
    this.restaurants_real = [];

    const request: google.maps.places.PlaceSearchRequest = {
      location: location,
      radius: 2000, // Search radius in meters
      type: 'restaurant' // Limit results to restaurants
    };
  
    if (filterOptions) {
      if (filterOptions.ranked_by) {
        request.rankBy = filterOptions.ranked_by;
      }
      
      if (filterOptions.maxPriceLevel) {
        request.maxPriceLevel = filterOptions.maxPriceLevel;
      }
      
      if (filterOptions.minPriceLevel) {
        request.minPriceLevel = filterOptions.minPriceLevel;
      }
      
      if (filterOptions.type) {
        request.keyword = filterOptions.type;
      }
    }
  
    this.placesService?.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.restaurants = results || [];
        this.clearMarkers();
        // Add markers for each restaurant
       this.restaurants.forEach(restaurant => {
        const marker = new google.maps.Marker({
          position: restaurant.geometry?.location,
          map: this.map,
          title: restaurant.name
        });
        
        this.markers.push(marker);

        // Add click event listener to show infowindow with details
        marker.addListener('click', () => {
          const infowindow = new google.maps.InfoWindow({
            content: `
              <h3>${restaurant.name}</h3>
              <p>${restaurant.vicinity}</p>
              <p>Rating: ${restaurant.rating}</p>
              <p>Price Level: ${restaurant.price_level}</p>
              <p><a href="${environment.detailsUrl}${restaurant.place_id}" target="_blank">More Details</a></p>
            `,
            maxWidth: 200 // Customize the maximum width of the info window
          });
          infowindow.open(this.map, marker);
        });
        
      });
      
      for (let i = 0; i < this.restaurants.length; i++) {
        this.googleMapsApiService.getPlaceDetails(this.restaurants[i].place_id, this.map).then((res) => {
          let restaurant = this.googleMapsApiService.convertToRestaurant(res, res.photos);
          this.restaurants_real.push(restaurant);
          //console.log(this.restaurants_real);
        }).catch((error) => { console.log(error); });
      }
      console.log(this.restaurants_real);
   
      } else {
        console.error('Places search request failed. Status:', status);
        this.restaurants = [];
        this.clearMarkers();
      }
    });
  }
  
  

  getPhotoUrl(restaurant: google.maps.places.PlaceResult): string {
    if (restaurant.photos && restaurant.photos.length > 0) {
      return restaurant.photos[0].getUrl();
    } else {
      return '';
    }
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }


}
