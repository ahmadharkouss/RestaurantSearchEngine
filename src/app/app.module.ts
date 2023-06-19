import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { GoogleMapsApiService  } from './places.services';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantDetailsComponent,
    RestaurantComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GoogleMapsApiService  ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoggingInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
