import { Component, OnInit } from '@angular/core';

import { tmdbAPIService } from 'src/app/services/tmdb-api.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private tmdbAPI: tmdbAPIService,
  ) { }

  ngOnInit(): void {
  }

}
