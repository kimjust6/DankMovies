import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { FirebaseService } from 'src/app/services/firebase.service';
import { tmdbAPIService } from 'src/app/services/tmdb-api.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // variable that is set when the api call is done loading
  public finishedLoading: boolean = false;
  // the array that holsd the columns of the table
  public displayedColumns: string[] = ['index', 'poster', 'movieTitle', 'runtime', 'tmdbRating', 'peoplePresent'];

  public movieTable: any = [];

  constructor(
    private tmdbAPI: tmdbAPIService,
    private firebase: FirebaseService,
  ) {

  }

  ngOnInit(): void {
    // get all the movies and store it in table
    this.firebase.getAllMovies()
      .then((res) => {
        this.movieTable = res;

        // create the index for the films so that we don't have to handle it on server side
        for (let i = 0; i < this.movieTable.length; ++i) {
          this.movieTable[i].index = i + 1;
        }
        this.finishedLoading = true;
        console.log(this.movieTable);
      });
  }



}
