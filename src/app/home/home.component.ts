import { Component  , inject} from '@angular/core';
import { YelpService } from '../yelp.service';
import { FormControl, FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent 
{
  term: string;
  location: string;
  restaurants: any[];

  applyForm = new FormGroup({
    term: new FormControl(''),
    location: new FormControl(''),
  });
  yelpService: YelpService = inject(YelpService);


  constructor( ) 
  {
    this.term = '';
    this.location = '';
    this.restaurants = [];
   }

  search(): void 
  {
    this.yelpService.searchRestaurants(this.applyForm.value.term?? '', this.applyForm.value.location?? '')
      .subscribe(response => {
        console.log(response);
        this.restaurants = response.businesses;
      });
  }

}
