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
    if (this.data.date) {
      // if a date is passed, then initialize it to the data that is passed
      this.movieForm?.controls['watchDate']?.setValue(this.data.date);
    }
    else {
      // otherwise initialize the form to have today's date
      this.movieForm?.controls['watchDate']?.setValue(new Date());
    }
  }

  ngAfterView() {

  }

  addMovie() {
    if (this.movieForm?.value?.watchDate) {
      if (this.data.movieData) {
        // this is probably an edit
        this.dbService.addMovieByID(this.data.movieData.movieID, this.movieForm?.value?.watchDate).then((res) => {
          // set the old watchdate to the new watchdate from form
          this.data.movieData = res;
          // pass the data back to the parent
          this.dialogRef.close(this.data.movieData);
        });
      }
      else if (this.data.tmdbMovieData) {
        // this is probably an add
        this.dbService.addMovieByID(this.data.tmdbMovieData.id, this.movieForm?.value?.watchDate).then((res)=>{
          this.dialogRef.close(res);
        });
        
      }
    }

    else {

    }
  }

}
