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
  movieData: any;
  posterURL: string = '';
  loaded: boolean = false;
  private sub: any;

  constructor(
    private tmdbAPI: tmdbAPIService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.movieID = +params['movieID']; // (+) converts string 'id' to a number
      this.tmdbAPI.getMovieDetailsByID(this.movieID).then(result => {
        this.movieData = result;
        this.posterURL = (this.tmdbAPI.getImageBaseURL() + this.movieData.poster_path);
        this.loaded = true;
      });
    });

  }

}
