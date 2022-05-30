import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FirebaseService } from 'src/app/services/firebase.service';
// import { tmdbAPIService } from 'src/app/services/tmdb-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { WatchlistModalComponent } from '../watchlist-modal/watchlist-modal.component';
import { CommonModalComponent } from '../common/common-modal/common-modal.component';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // variable that is set when the api call is done loading
  public finishedLoading: boolean = false;
  // the array that holds the columns of the table to show
  public displayedColumns: string[] = ['index', 'poster', 'movieTitle', 'runtime', 'tmdbRating', 'peoplePresent', 'edit', 'delete'];
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
    // private tmdbAPI: tmdbAPIService,
    private dbService: FirebaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
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
    // get all the movies and store it in table
    this.dbService.getAllMovies()
      .then((res) => {
        this.arrayMovieTable = res;
        this.arrayMovieTable.reverse();
        // create the index for the films so that we don't have to handle it on server side
        let index = this.arrayMovieTable.length;
        for (let movie of this.arrayMovieTable) {
          movie.index = index--;
        }

        this.movieTable = new MatTableDataSource(this.arrayMovieTable);
        this.movieTable.sort = this.sort;
        this.movieTable.paginator = this.paginator;
        this.finishedLoading = true;
      });
  }

  editMovie(movieData: Movie) {
    console.log("edit: ", movieData);

    // if add to watchlist is clicked, open the watchlist modal component
    const editDialogRef = this.dialog.open(WatchlistModalComponent, {
      data: {
        movieData: movieData,
        date: movieData.watchDate,
      }
    });

    // handle when the modal is closed
    editDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // 
      if (result) {

      }
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
        messageText: 'Are you sure you want to delete this movie from the list?',
      }
    });

    // handle when the modal is closed
    deleteDialogRef.afterClosed().subscribe(result => {
      // if the confirm dialog box is selected, delete the film from the table and from the firestore db
      if (result) {
        // console.log("deleted: ", data);
        this.deleteMovie(data);
      }
      else
      {

      }
    });
  }

  deleteMovie(data: any) {
    // delete from the db first
    this.dbService.deleteMovieByCollectionID(data.fireCollectionID).then(() => {
      // if successful then delete it from the local array
      this.arrayMovieTable.splice(this.arrayMovieTable.length - (data.index), 1);
      // fix the indices of the table
      for (let index = 0; index < this.arrayMovieTable.length - (data.index - 1); ++index) {
        this.arrayMovieTable[index].index = this.arrayMovieTable.length - index;
      }
      // assign the data to be the newly spliced table
      this.movieTable.data = this.arrayMovieTable;
    });
  }

}
