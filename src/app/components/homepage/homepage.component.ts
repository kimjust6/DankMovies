import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FirebaseService } from 'src/app/services/firebase.service';
import { tmdbAPIService } from 'src/app/services/tmdb-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // variable that is set when the api call is done loading
  public finishedLoading: boolean = false;
  // the array that holds the columns of the table to show
  public displayedColumns: string[] = ['index', 'poster', 'movieTitle', 'runtime', 'tmdbRating', 'peoplePresent'];
  // the MatTableDataSource that holds the movie data
  public movieTable: any;
  // the form for filtering films
  public formFilter: FormGroup = this.fb.group({
    filter: [null, []],
  });

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private tmdbAPI: tmdbAPIService,
    private firebase: FirebaseService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.populateMovieTable();

  }

  // filter out the movies from the table
  applyMovieFilter(filterString: string) {
    this.movieTable.filter = filterString.trim().toLowerCase();
  }

  // populate the movie table
  populateMovieTable() {
    // initialize the movie table
    let tempMovieTable: any = [];
    // get all the movies and store it in table
    this.firebase.getAllMovies()
      .then((res) => {
        tempMovieTable = res;
        tempMovieTable.reverse();
        // create the index for the films so that we don't have to handle it on server side
        let index = tempMovieTable.length;
        for (let movie of tempMovieTable) {
          movie.index = index--;
        }

        this.movieTable = new MatTableDataSource(tempMovieTable);
        this.movieTable.sort = this.sort;
        this.movieTable.paginator = this.paginator;
        this.finishedLoading = true;
      });
  }
}
