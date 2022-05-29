import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tmdbFindMovieResultsArray } from 'src/app/interfaces/interfaces';


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
  ) {
    console.log(this.data.movieData)
  }

  ngOnInit(): void {
  }

  addMovie()
  {
    
  }

}
