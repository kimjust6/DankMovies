import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private tmbdAPI: ApiServiceService,
  ) { }

  ngOnInit(): void {
  }


  doStuff()
  {
    // console.log("nice");
    this.tmbdAPI.getToken();
  }
}
