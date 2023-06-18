import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { YelpService } from './yelp.service';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [YelpService ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoggingInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
