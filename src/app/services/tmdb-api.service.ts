import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  API_KEYv3: string = 'f188b78886ed3d7d07d9dc9ce52af7e0';
  API_KEYv4: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTg4Yjc4ODg2ZWQzZDdkMDdkOWRjOWNlNTJhZjdlMCIsInN1YiI6IjYyN2IxNzI4ZDc1YmQ2MDBhYjEzYzBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hlZyYH07el5DdhBJ_bk-dlD0xSSibkfzcRRFVhD2rKU';
  BASE_URL: string = 'https://api.themoviedb.org/3/';
  TOKEN_URL: string = 'authentication/token/new'
  ACCESS_TOKEN: string = '';

  constructor(
    private http: HttpClient,
  ) { }


  getToken() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('api_key', this.API_KEYv3);
    this.http.get(this.BASE_URL + this.TOKEN_URL, { params: queryParams }).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  get(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }
}
