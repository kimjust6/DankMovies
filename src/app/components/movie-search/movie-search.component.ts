import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tmdbAPIService } from 'src/app/services/tmdb-api.service';
import { filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

// import { FirebaseService } from 'src/app/services/firebase.service';
import { tmdbFindMovieResultsArray } from 'src/app/interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { WatchlistModalComponent } from '../watchlist-modal/watchlist-modal.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  // query parameter to tell what to order the search results in
  public orderBy: string = '';
  // query parameter that holds the page number we are on
  public page: number = 0;
  // query parameter that holds the number of results to return
  public pageSize: number = 20;
  // query parameter that holds the search query
  public query: string = '';
  // holds the results of search api call
  public results: any = null;
  // public pageEvent: any;

  // search form
  public myForm: FormGroup;
  // variable that subscribes to the router 

  constructor(
    public tmdbAPI: tmdbAPIService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    // private dbService: FirebaseService,
    private dialog: MatDialog,
  ) {
    this.myForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    // this forces the component to refresh
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

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

    if (this.query !== '') {
      this.searchMovie(this.query, this.page);
    }

  } // ngOnInit

  ngOnDestroy() {
  }

  searchMovie(_query: string, _page: number) {
    this.tmdbAPI.findMovies(_query, _page).then((res) => {
      this.results = res;
      // console.log("result: ", res);
      for (let r of this.results.results) {
        if (!r.backdrop_path) {
          r.backdrop_path = r.poster_path;
        }
      }
    });
  }

  onSearch() {
    // this.searchMovie(this.myForm?.value?.search, 1);
    this.query = this.myForm?.value?.search;
    // redirect page using params
    if (this.query) {
      this.router.navigate(["/movie/search"], { queryParams: { query: this.query, page: 0 } });
      this.searchMovie(this.query, 1);
      // this.myForm?.value?.search?.setValue(this.query);
    }
  }

  openMovieDetails(_id: number) {
    this.router.navigate(["/movie/details", _id]);
  }

  handlePagination(_event: PageEvent) {
    console.log("pageEvent: ", _event);
    this.page = _event.pageIndex;
    this.router.navigate(["/movie/search"], { queryParams: { query: this.query, page: this.page } });
  }

  openWatchlistModal(_movie: tmdbFindMovieResultsArray) {

    // if add to watchlist is clicked, open the watchlist modal component
    const dialogRef = this.dialog.open(WatchlistModalComponent, {
      data: {
        movieData: _movie
      }
    });

    // handle when the modal is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // 
      if (result) {
        
      }
    });

  }
}
