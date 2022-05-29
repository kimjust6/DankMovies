import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tmdbFindMovieResultsArray } from 'src/app/interfaces/interfaces';
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
    @Inject(MAT_DIALOG_DATA) public data: { movieData: tmdbFindMovieResultsArray },
    private fb: FormBuilder,
    private dbService: FirebaseService,
    private dialogRef: MatDialogRef<WatchlistModalComponent>
  ) {
    console.log(this.data.movieData)
  }

  ngOnInit(): void {
    // initialize the form to have today's date
    this.movieForm?.controls['watchDate']?.setValue(new Date());
  }

  ngAfterView()
  {

  }

  addMovie() {
    if (this.movieForm?.value?.watchDate) {
      // console.log(this.data.movieData.id, this.movieForm?.value?.watchDate);
      this.dbService.addMovieByID(this.data.movieData.id, this.movieForm?.value?.watchDate);
      this.dialogRef.close(true);
    }
    else
    {

    }
  }

}
