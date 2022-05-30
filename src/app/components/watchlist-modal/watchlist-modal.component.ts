import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tmdbFindMovieResultsArray, Movie } from 'src/app/interfaces/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-watchlist-modal',
  templateUrl: './watchlist-modal.component.html',
  styleUrls: ['./watchlist-modal.component.scss']
})
export class WatchlistModalComponent implements OnInit {
  // 
  public picker: any;
  // the form for the
  public movieForm: FormGroup = this.fb.group({
    watchDate: [null, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      tmdbMovieData: tmdbFindMovieResultsArray,
      movieData: Movie,
      date: Date,
    },
    private fb: FormBuilder,
    private dbService: FirebaseService,
    private dialogRef: MatDialogRef<WatchlistModalComponent>
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.date) {
      // if a date is passed, then initialize it to the data that is passed
      // console.log(this.data.date);
      this.movieForm?.controls['watchDate']?.setValue(this.data.date);
    }
    else {
      // otherwise initialize the form to have today's date
      this.movieForm?.controls['watchDate']?.setValue(new Date());
      console.log(new Date());
    }
  }

  ngAfterView() {

  }

  addMovie() {
    if (this.movieForm?.value?.watchDate) {
      if (this.data.movieData) {
        this.dbService.addMovieByID(this.data.movieData.movieID, this.movieForm?.value?.watchDate);
        this.dialogRef.close(true);
      }
      else if (this.data.tmdbMovieData)
      {
        this.dbService.addMovieByID(this.data.tmdbMovieData.id, this.movieForm?.value?.watchDate);
        this.dialogRef.close(true);
      }
    }

    else {

    }
  }

}
