import { Component , Input , OnInit} from '@angular/core';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  @Input() restaurant! : Restaurant;
  getRestaurantString(): string {
    return JSON.stringify(this.restaurant);
  }

}
