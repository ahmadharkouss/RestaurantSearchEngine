import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const restaurantParam = this.route.snapshot.queryParams['restaurant'];
    this.restaurant = JSON.parse(restaurantParam);
  }
}
