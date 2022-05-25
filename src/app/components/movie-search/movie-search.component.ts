import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tmdbAPIService } from 'src/app/services/tmdb-api.service';
import { filter, map } from 'rxjs/operators';
import { tmdbFindMovieResults } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  // query parameter to tell what to order the search results in
  public orderBy: string = '';
  // query parameter that holds the page number we are on
  public page: number = 1;
  // query parameter that holds the number of results to return
  public pageSize: number = 20;
  // query parameter that holds the search query
  public query: string = 'harry';

  public results: any = null;

  constructor(
    public tmdbAPI: tmdbAPIService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {

    // subscribe to the query parameters in the route
    // following code is executed whe one  the query parameters change
    // remoe pipe/filter line if you want to subscribe to all query parameter changes
    this.route.queryParams
      .pipe(filter(param => param['orderBy']))
      .subscribe(params => {
        console.log("myorderby: ", params);
        this.orderBy = params['orderBy'];
      }
      );

    this.route.queryParams
      .pipe(filter(param => param['page']))
      .subscribe(params => {
        this.page = params['page'];
      }
      );

    this.route.queryParams
      .pipe(filter(param => param['pageSize']))
      .subscribe(params => {
        this.pageSize = params['pageSize'];
      }
      );

    this.route.queryParams
      .pipe(filter(param => param['query']))
      .subscribe(params => {
        this.query = params['query'];
      }
      );


    // console.log("orderBy: ", this.orderBy);
    // console.log("query: ", this.query);
    // console.log("page: ", this.page);
    // console.log("pageSize: ", this.pageSize);


    this.tmdbAPI.findMovies(this.query, this.page).then((res) => {
      this.results = res;
      console.log("result: ", res);
      // for (let r of res)
    });

    // this.tmdbAPI.findMoviesObs(this.query, this.page).subscribe((res) => {
    //   console.log(res);
    //   this.results = res;
    // });


  }

}
