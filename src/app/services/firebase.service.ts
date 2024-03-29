import { Injectable } from '@angular/core';
import {
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { addDoc, Firestore, collection, doc } from '@angular/fire/firestore';
import { deleteDoc, getDocs, setDoc } from '@firebase/firestore';

import { v4 as uuidv4 } from 'uuid';
// import { UUID } from 'angular2-uuid';
import { tmdbAPIService } from './tmdb-api.service';

import { Movie } from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	private uuid: string | undefined;
	private movieArray: any = [];
	private MOVIE_COLLECTION = 'Movies';
	private USER_COLLECTION = 'Users';
	public NULL_VALUE = -69;

	constructor(
		private auth: Auth,
		private firestore: Firestore,
		private tmdbAPI: tmdbAPIService
	) {}

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
			.then(response => {
				console.log(response);
			})
			.catch(error => {
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
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				this.myAlert(error);
			});
	}

	/**
	 * @name addUserInfo
	 * @description this the method that will hold the user data in the firestore db
	 * (real addUser will use firebase authentication)
	 * @param value the value of the form that will be entered into the firestore db
	 */
	public addUserInfo(_value: any) {
		const dbInstance = collection(this.firestore, this.USER_COLLECTION);
		addDoc(dbInstance, _value)
			.then(() => {
				console.log('added user');
			})
			.catch(error => {
				this.myAlert(error.message);
			});
	}

	/**
	 * @name addMovieByValue
	 * @description save the film data to the firestore db
	 * @param _value the tmdb movie data
	 * @param _date the date that the film was watched
	 */
	public addMovieByValue(_value: any, _date: Date): Promise<Movie> {
		return this.addMovieByValueAndCollectionID(
			_value,
			_date,
			_date.getTime().toString() + this.generateUUID()
		);
	}

	/**
	 * @name addMovieByValue
	 * @description save the film data to the firestore db
	 * @param _value the tmdb movie data
	 * @param _date the date that the film was watched
	 */
	public addMovieByValueAndCollectionID(
		_value: any,
		_date: Date,
		_collectionID: string
	): Promise<Movie> {
		return this.updateMovieByValueByCollectionID(
			_value,
			_date,
			_collectionID
		);
	}

	/**
	 * @name updateMovieByIDByCollectionID
	 * @param _movieID this is the id of the movie
	 * @param _date this is the date that the film was watched
	 * @param _collectionID this is the unique id that the server will save as the collectionID
	 * @returns
	 */
	public async updateMovieByIDByCollectionID(
		_movieID: number,
		_date: Date,
		_collectionID: string
	): Promise<Movie> {
		const movieDetail = await this.tmdbAPI.getMovieDetailsByID(_movieID);
		return this.updateMovieByValueByCollectionID(
			movieDetail,
			_date,
			_collectionID
		);
	}

	/**
	 * @name updateMovieByValueByCollectionID
	 * @param value
	 * @param date
	 * @param collectionID
	 * @returns Promise<Movie>
	 */
	public async updateMovieByValueByCollectionID(
		value: any,
		date: Date,
		collectionID: string
	): Promise<Movie> {
		// initialize movie
		let movie = {
			budget: value?.budget,
			movieCollectionID: value?.belongs_to_collection?.id,
			fireCollectionID: collectionID,
			collectionName: value?.belongs_to_collection?.name,
			filmTitle: value?.title,
			movieID: value?.id,
			overview: value?.overview,
			posterPath: this.tmdbAPI.getImageBaseURL() + value.poster_path,
			rating: -1,
			releaseDate: value?.release_date,
			revenue: value?.revenue,
			runtime: value?.runtime,
			tmdbRating: value?.vote_average,
			tmdbVoteCount: value?.vote_count,
			watchDate: date,
			failed: [],
			watched: [],
		};

		// check for invalid data
		movie.budget ? true : (movie.budget = this.NULL_VALUE);
		movie.movieCollectionID
			? true
			: (movie.movieCollectionID = this.NULL_VALUE);
		movie.collectionName ? true : (movie.collectionName = this.NULL_VALUE);
		movie.filmTitle ? true : (movie.filmTitle = this.NULL_VALUE);
		movie.movieID ? true : (movie.movieID = this.NULL_VALUE);
		movie.overview ? true : (movie.overview = this.NULL_VALUE);
		movie.posterPath ? true : (movie.posterPath = '');
		movie.posterPath === ''
			? (movie.posterPath =
					this.tmdbAPI.getImageBaseURL() + value.backdrop_path)
			: false;
		movie.rating ? true : (movie.rating = this.NULL_VALUE);
		movie.releaseDate ? true : (movie.releaseDate = this.NULL_VALUE);
		movie.revenue ? true : (movie.revenue = this.NULL_VALUE);
		movie.runtime ? true : (movie.runtime = this.NULL_VALUE);
		movie.tmdbRating ? true : (movie.tmdbRating = this.NULL_VALUE);
		movie.tmdbVoteCount ? true : (movie.tmdbVoteCount = this.NULL_VALUE);

		const dataToUpdate = doc(
			this.firestore,
			this.MOVIE_COLLECTION,
			collectionID
		);
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
	 * @param _movieID this is the id of the movie that will be returned
	 * @param _date this is the date that the movie was watched
	 */
	public async addMovieByID(_movieID: number, _date: Date): Promise<Movie> {
		const movieDetail = await this.tmdbAPI.getMovieDetailsByID(_movieID);
		return this.addMovieByValue(movieDetail, _date);
	}

	/**
	 * @name addMovieByIDandCollectionID
	 * @description this method will look up the details of the movie using the tmdb api and saved it
	 * into the firestore db
	 * @param _movieID this is the id of the movie that will be returned
	 * @param _date this is the date that the movie was watched
	 * @param _collectionID this is the collection id that will be manually set
	 */
	public async addMovieByIDandCollectionID(
		_movieID: number,
		_date: Date,
		_collectionID: string
	): Promise<Movie> {
		const movieDetail = await this.tmdbAPI.getMovieDetailsByID(_movieID);
		return this.addMovieByValueAndCollectionID(
			movieDetail,
			_date,
			_collectionID
		);
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
		querySnapshot.forEach(doc => {
			// doc.data() is never undefined for query doc snapshots
			this.movieArray[i++] = (doc.id, ' => ', doc.data());
		});
		// convert firebase timestamp to date
		for (let movie of this.movieArray) {
			movie.watchDate = movie.watchDate.toDate();
		}
		return this.movieArray;
	}

	/**
	 * @name deleteMovieByID
	 * @description this method deletes the film in the firestore db by using id
	 * @param collectionID this is the id of the document that is to be deleted
	 */
	public async deleteMovieByCollectionID(
		collectionID: string
	): Promise<void> {
		const dataToDelete = doc(
			this.firestore,
			this.MOVIE_COLLECTION,
			collectionID
		);
		try {
			await deleteDoc(dataToDelete);
		} catch (error: any) {
			this.myAlert(error.message);
		}
	}

	/**
	 * @name generateUUID
	 * @description this method returns a unique id for ids in lists or the db
	 * @returns a string with a unique id
	 */
	public generateUUID(): string {
		this.uuid = uuidv4();
		return this.uuid ?? '';
	}
}
