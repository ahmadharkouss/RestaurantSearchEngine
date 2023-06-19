import { Component , Input , OnInit} from '@angular/core';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  @Input() restaurant! : Restaurant;

  isString(value: any): boolean {
  return typeof value === 'string';
}


}
