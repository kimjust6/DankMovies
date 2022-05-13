import { Component, OnInit } from '@angular/core';
import { tmdbAPIService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private tmdbAPI: tmdbAPIService,
  ) { }

  ngOnInit(): void {
  }


  doStuff()
  {
    this.tmdbAPI.checkToken();
  }
}
