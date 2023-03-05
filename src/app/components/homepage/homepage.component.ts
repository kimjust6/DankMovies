import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { WatchlistModalComponent } from '../watchlist-modal/watchlist-modal.component';
import { CommonModalComponent } from '../common/common-modal/common-modal.component';
import { Movie } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // variable that is set when the api call is done loading
  public finishedLoading: boolean = false;
  // the array that holds the columns of the table to show
  public displayedColumns: string[] = ['index', 'poster', 'movieTitle', 'watchDate', 'runtime', 'tmdbRating', 'peoplePresent', 'edit', 'delete'];
  // the MatTableDataSource that holds the movie data
  public movieTable: any;
  // the array version of movieTable
  public arrayMovieTable: any = [];
  // the form for filtering films
  public formFilter: FormGroup = this.fb.group({
    filter: [null, []],
  });

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private dbService: FirebaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) {
    console.log(environment.FIREBASE.projectId)
    console.log(environment.GOOGLE.CLIENT_ID)
    console.log(environment.TMDB.API_KEY_V3)
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
    // get all the movies and store it in table
    this.dbService.getAllMovies()
      .then((res) => {
        this.arrayMovieTable = res;
        this.arrayMovieTable.reverse();
        // create the index for the films so that we don't have to handle it on server side
        this.fixIndex();

        this.movieTable = new MatTableDataSource(this.arrayMovieTable);
        this.movieTable.sort = this.sort;
        this.movieTable.paginator = this.paginator;
        this.finishedLoading = true;
      });
  }

  editMovie(movieData: any) {
    // if add to watchlist is clicked, open the watchlist modal component
    const editDialogRef = this.dialog.open(WatchlistModalComponent, {
      data: {
        movieData: movieData,
        date: movieData.watchDate,
      }
    });

    // handle when the modal is closed
    editDialogRef.afterClosed().subscribe(result => {
      // handle the editing
      if (result) {
        // delete from movieTable and firebase
        this.deleteMovie(movieData).then(() => {

          // delete movie from the local array
          this.arrayMovieTable.splice(this.arrayMovieTable.length - (movieData.index), 1);
          console.log("arrayMovieTable: ", this.arrayMovieTable);
          // find the position of the new array
          let index = 0;
          for (; index < this.arrayMovieTable.length && this.arrayMovieTable[index].watchDate > result.watchDate; ++index) {
          }
          // add the new element into the array
          this.arrayMovieTable.splice(index, 0, result);
          // fix the indices of the table
          this.fixIndex();
          // assign the data to be the newly spliced table
          this.movieTable.data = this.arrayMovieTable;
        });
      } // end if
    });
  }

  openDeleteDialog(data: any) {
    // open a confirmation dialog to ensure the user wants to delete the film 
    const deleteDialogRef = this.dialog.open(CommonModalComponent, {
      data: {
        movie: data,
        actionText: 'Delete',
        cancelText: 'Cancel',
        titleText: data?.filmTitle,
        messageText: 'Are you sure you want to delete this movie from the watchlist?',
      }
    });

    // handle when the modal is closed
    deleteDialogRef.afterClosed().subscribe(result => {
      // if the confirm dialog box is selected, delete the film from the table and from the firestore db
      if (result) {
        this.deleteMovie(data).then(() => {
          // if successful then delete it from the local array
          this.arrayMovieTable.splice(this.arrayMovieTable.length - (data.index), 1);
          // for (let index = 0; index < this.arrayMovieTable.length - (data.index - 1); ++index) {
          //   this.arrayMovieTable[index].index = this.arrayMovieTable.length - index;
          // }
          // fix the indices of the table
          this.fixIndex();
          // assign the data to be the newly spliced table
          this.movieTable.data = this.arrayMovieTable;
        });
      }
    });
  } // openDeleteDialog

  async deleteMovie(data: any) {
    // delete from the db first
    return await this.dbService.deleteMovieByCollectionID(data.fireCollectionID);
  }

  fixIndex() {
    let index = this.arrayMovieTable.length;
    for (let movie of this.arrayMovieTable) {
      movie.index = index--;
    }
  }

  navigateToDetailView(movieData: Movie) {
    this.router.navigate(["/movie/details",movieData.movieID], { queryParams: { } });
  }

}
