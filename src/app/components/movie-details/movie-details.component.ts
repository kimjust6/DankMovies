import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tmdbAPIService } from 'src/app/services/tmdb-api.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  
  movieID: number | undefined;
  private sub: any;

  constructor(
    private tmdbAPI: tmdbAPIService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.movieID = +params['movieID']; // (+) converts string 'id' to a number
    });

  }
}
