import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  //api urls
  private API_KEY_V3: string = 'f188b78886ed3d7d07d9dc9ce52af7e0';
  private API_KEY_V4: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTg4Yjc4ODg2ZWQzZDdkMDdkOWRjOWNlNTJhZjdlMCIsInN1YiI6IjYyN2IxNzI4ZDc1YmQ2MDBhYjEzYzBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hlZyYH07el5DdhBJ_bk-dlD0xSSibkfzcRRFVhD2rKU';
  private BASE_URL_V3: string = 'https://api.themoviedb.org/3/';
  private BASE_URL_V4: string = 'https://api.themoviedb.org/4/';
  private TOKEN_URL: string = 'authentication/token/new'
  private SEARCH_MOVIE_URL: string = 'search/movie';
  private SEARCH_KEYWORD_URL: string = 'search/keyword';
  private SEARCH_MULTI_URL: string = 'search/multi';
  private ACCESS_TOKEN: any = null;

  private MOVIE_DETAILS_BY_ID: string = 'movie/{movie_id}';
  private MOVIE_IMAGES_BY_ID: string = 'movie/{movie_id}/images';

  constructor(
    private http: HttpClient,
  ) {
    this.getMovieImagesByID(767).then(result =>
    // this.getMovieDetailsByID(19995).then(result =>
    // this.getMovieDetailsByID(671).then(result =>
    // this.findMovies("avatar",1).then(result =>
      {
        console.log(result);
      });
    
  }

  /**
   * @name getToken
   * @description method that gets the a V3 Access Token
   * @returns {Promise}
   */
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


  /**
   * @name checkToken
   * @description method that will check if we have a valid v3 token, if not, it will fetch a valid token & store in this.ACCESS_TOKEN
   * @returns {void}
   */
  async checkToken() {

    //check if the token is null or if token is expired
    if (this.ACCESS_TOKEN === null || this.ACCESS_TOKEN['success'] === false || new Date(this.ACCESS_TOKEN['expires_at']) < new Date()) {
      //if token is null, get token
      await this.getToken().then((result) => {
        this.ACCESS_TOKEN = result;
      });;

    }
  }

  /**
   * @name findMovies
   * @description returns a page _page of the _query
   * @param {string} _query the search string that we want to match
   * @param {number} _page the page number for pagination
   * @returns {Promise}
   */
  async findMovies(_query: string, _page: number) {
    //check if we have token (only required for V3)
    // this.checkToken();

    // create the url
    const url = this.BASE_URL_V3 + this.SEARCH_MOVIE_URL;

    // create the headers for the api call
    const queryHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY_V4}`
    })

    // create the parameters for the api call
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('query', _query)
      // .append('api_key', this.API_KEY_V3)
      .append('page', _page);

    // make the api call
    const data$ = this.http.get(url, { headers: queryHeader, params: queryParams });
    const value = await lastValueFrom(data$);

    return value;

  }

  /**
   * @name getMovieDetailsByID
   * @description this method returns the details of a movie that we want to find (by id)
   * @param _movieID the id of the movie that we want to find details of 
   * @returns {Promise}
   */
  async getMovieDetailsByID(_movieID: number) {
    // check if we have token (only required for V3)
    // this.checkToken();

    // create the url
    const url = this.BASE_URL_V3 + this.MOVIE_DETAILS_BY_ID.replace('{movie_id}', _movieID.toString());

    // create the headers for the api call
    const queryHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY_V4}`
    });

    // create the parameters for the api call
    let queryParams = new HttpParams();
    queryParams = queryParams
      // .append('api_key', this.API_KEY_V3)


    // make the api call
    const data$ = this.http.get(url, { headers: queryHeader, params: queryParams });
    const value = await lastValueFrom(data$);

    return value;

  }

  /**
   * @name getMovieImagesByID
   * @description this method returns images and posters of the movie that we want to find (by id)
   * @param _movieID the id of the movie that we want to find images of
   * @returns 
   */
  async getMovieImagesByID(_movieID: number) {
    //check if we have token (only required for V3)
    // this.checkToken();

    // create the url
    const url = this.BASE_URL_V3 + this.MOVIE_IMAGES_BY_ID.replace('{movie_id}', _movieID.toString());

    // create the headers for the api call
    const queryHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY_V4}`
    })

    // make the api call
    const data$ = this.http.get(url, { headers: queryHeader });
    const value = await lastValueFrom(data$);

    return value;

  }
}