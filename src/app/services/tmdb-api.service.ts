import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private API_KEY_V3: string = 'f188b78886ed3d7d07d9dc9ce52af7e0';
  private API_KEY_V4: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTg4Yjc4ODg2ZWQzZDdkMDdkOWRjOWNlNTJhZjdlMCIsInN1YiI6IjYyN2IxNzI4ZDc1YmQ2MDBhYjEzYzBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hlZyYH07el5DdhBJ_bk-dlD0xSSibkfzcRRFVhD2rKU';
  private BASE_URL_V3: string = 'https://api.themoviedb.org/3/';
  private BASE_URL_V4: string = 'https://api.themoviedb.org/4/';
  private TOKEN_URL: string = 'authentication/token/new'
  private SEARCH_MOVIE_URL: string = 'search/movie';
  private SEARCH_KEYWORD_URL: string = 'search/keyword';
  private ACCESS_TOKEN: any = null;

  constructor(
    private http: HttpClient,
  ) {
    this.searchMovie("harry",2);
  }


  async getToken() {
    // create the url
    const url = this.BASE_URL_V3 + this.TOKEN_URL;

    // create the parameters for the api call
    let queryParams = new HttpParams();
    queryParams = queryParams.append('api_key', this.API_KEY_V3);

    // make the api call
    const data$ = this.http.get(url, { params: queryParams });
    // const value = await lastValueFrom(data$);
    const value = await lastValueFrom(data$);

    return value;
  }

  async checkToken() {

    //check if the token is null or if token is expired
    if (this.ACCESS_TOKEN === null || this.ACCESS_TOKEN['success'] === false || new Date(this.ACCESS_TOKEN['expires_at']) < new Date()) {
      //if token is null, get token
      await this.getToken().then((result) => {
        this.ACCESS_TOKEN = result;
      });;

    }
  }




  async searchMovie(_query: string, _page: number) {
    //check if we have token
    this.checkToken();

    // create the url
    const url = this.BASE_URL_V4 + this.SEARCH_MOVIE_URL;

    // create the headers for the api call
    const queryHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.ACCESS_TOKEN}`
    })

    // create the parameters for the api call
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('query', _query)
      .append('api_key', this.API_KEY_V3)
      .append('page', _page);

    // make the api call
    const data$ = this.http.get(url, { headers: queryHeader, params: queryParams });
    // const value = await lastValueFrom(data$);
    await lastValueFrom(data$).then((result) => {
      console.log(result);
    });

  }
}
