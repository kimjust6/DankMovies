import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth'

import {
  addDoc,
  Firestore,
  collection,
  getDoc,
  doc
} from '@angular/fire/firestore'
import { getDocs, setDoc, updateDoc } from '@firebase/firestore';

import { UUID } from 'angular2-uuid';
import { tmdbAPIService } from './tmdb-api.service';

import { Movie } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbInstance: any;
  private uuid: string | undefined;
  private movieArray: any = [];
  private MOVIE_COLLECTION = 'Movies';
  private USER_COLLECTION = 'Users';
  private NULL_VALUE = -69;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private tmdbAPI: tmdbAPIService,
  ) {
  }

  /**
   * @description this method creates an alert message
   * @param alertMessage the message you want to be alerted
   */
  public myAlert(alertMessage: string) {
    alert(alertMessage);
  }

  /**
   * @name handleRegister
   * @description handles the register method
   * @param value the value of the form that will be entered into the firestore db
   */
  public handleRegister(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  /**
   * @name handleLogin
   * @description handles the login method
   * @param value the value of the form that will be entered into the firestore db
   */
  public handleLogin(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  /**
   * @name addUserInfo
   * @description this the method that will hold the user data in the firestore db 
   * (real addUser will use firebase authentication)
   * @param value the value of the form that will be entered into the firestore db
   */
  public addUserInfo(value: any) {
    const dbInstance = collection(this.firestore, this.USER_COLLECTION);
    addDoc(dbInstance, value)
      .then(() => {
        console.log("added user");
      })
      .catch((error) => {
        this.myAlert(error.message);
      });

  }


  public async addMovieByValue(value: any, date: Date): Promise<Movie> {
    return this.updateMovieByValueByCollectionID(value, date, new Date().getTime().toString() + this.generateUUID());
  }


  public async updateMovieByIDByCollectionID(movieID: number, date: Date, collectionID: string): Promise<Movie> {
    const movieDetail = await this.tmdbAPI.getMovieDetailsByID(movieID);
    return this.updateMovieByValueByCollectionID(movieDetail, date, collectionID);
  }
  
  public async updateMovieByValueByCollectionID(value: any, date: Date, collectionID: string): Promise<Movie> {

    // initialize movie
    let movie = {
      budget: value?.budget,
      collectionID: value?.belongs_to_collection?.id,
      collectionName: value?.belongs_to_collection?.name,
      filmTitle: value?.title,
      movieID: value?.id,
      overview: value?.overview,
      posterPath: this?.tmdbAPI.getImageBaseURL + value.posterPath,
      rating: -1,
      releaseDate: value?.release_date,
      revenue: value?.revenue,
      runtime: value?.runtime,
      tmdbRating: value?.vote_average,
      tmdbVoteCount: value?.vote_count,
      watchDate: date,
      failed: [],
      watched: [],
    }

    // check for invalid data
    movie.budget ? true : movie.budget = -this.NULL_VALUE;
    movie.collectionID ? true : movie.collectionID = -this.NULL_VALUE;
    movie.collectionName ? true : movie.collectionName = -this.NULL_VALUE;
    movie.filmTitle ? true : movie.filmTitle = -this.NULL_VALUE;
    movie.movieID ? true : movie.movieID = -this.NULL_VALUE;
    movie.overview ? true : movie.overview = -this.NULL_VALUE;
    movie.posterPath ? true : movie.posterPath = -this.NULL_VALUE;
    movie.rating ? true : movie.rating = -this.NULL_VALUE;
    movie.releaseDate ? true : movie.releaseDate = -this.NULL_VALUE;
    movie.revenue ? true : movie.revenue = -this.NULL_VALUE;
    movie.runtime ? true : movie.runtime = -this.NULL_VALUE;
    movie.tmdbRating ? true : movie.tmdbRating = -this.NULL_VALUE;
    movie.tmdbVoteCount ? true : movie.tmdbVoteCount = -this.NULL_VALUE;

    const dataToUpdate = doc(this.firestore, this.MOVIE_COLLECTION, collectionID);
    setDoc(dataToUpdate, movie);

    return movie;




    // get the collection
    // const dbInstace = collection(this.firestore, this.MOVIE_COLLECTION);

    //add the movie to the db (firebase auto generates ids)
    // const querySnapshot = await addDoc(dbInstace, movie);

  }

  /**
   * @name addMovieByID
   * @description this method will look up the details of the movie using the tmdb api and saved it 
   * into the firestore db
   * @param movieID this is the id of the movie that will be returned
   */
  public async addMovieByID(movieID: number, date: Date): Promise<Movie> {
    //make the api call to get the movie details
    const movieDetail = await this.tmdbAPI.getMovieDetailsByID(movieID);
    return this.addMovieByValue(movieDetail, date);
  }

  /**
   * @name getAllMovies
   * @description this method accesses the firestore db and returns data from the collection 'Movies'
   * @returns Promise with an array of all the movies in the watchlist
   */
  public async getAllMovies(): Promise<any> {
    const dbInstance = collection(this.firestore, this.MOVIE_COLLECTION);
    const querySnapshot = await getDocs(dbInstance);
    let i = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.movieArray[i++] = (doc.id, " => ", doc.data());
    });

    return this.movieArray;

  }

  /**
   * @name generateUUID
   * @description this method returns a unique id for ids in lists or the db
   * @returns a string with a unique id
   */
  public generateUUID(): string {
    this.uuid = UUID.UUID();
    return this.uuid;
  }


}
