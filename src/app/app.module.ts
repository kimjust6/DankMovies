import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { Page404Component } from './components/page-404/page-404.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ApiServiceService } from './services/tmdb-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    Page404Component,
    MovieDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ApiServiceService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
