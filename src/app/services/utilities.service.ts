import { Injectable } from '@angular/core';
import { FullTmdbFindMovieResultsArray, Movie, tmdbFindMovieResultsArray } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public NULL_VALUE = -69;
  constructor() { }

  /**
   * @name convertMovieToTmdb
   * @description this method converts a Movie to a tmdbFindMovieResultsArray
   * @param _movie Movie 
   * @returns tmdbFindMovieResultsArray
   */
  public convertMovieToTmdb(_movie: Movie): tmdbFindMovieResultsArray {
    let tmdbMovie: tmdbFindMovieResultsArray = {
      adult: false,
      backdrop_path: _movie.posterPath,
      genre_ids: [],
      id: _movie.movieID,
      original_language: '',
      original_title: _movie.filmTitle,
      overview: _movie.overview,
      popularity: this.NULL_VALUE,
      poster_path: _movie.posterPath,
      release_date: _movie.releaseDate.toString(),
      video: false,
      vote_average: _movie.tmdbRating,
      vote_count: _movie.tmdbVoteCount,
    };

    return tmdbMovie;
  }

  // public convertFullTmdbToMovie(_tmdbMovie: FullTmdbFindMovieResultsArray): Movie {
  //   let Movie: Movie = {
  //     budget: _tmdbMovie.,
  //     movieCollectionID: _tmdbMovie.,
  //     fireCollectionID: _tmdbMovie.,
  //     collectionName: _tmdbMovie.,
  //     failed: string _tmdbMovie.,
  //     filmTitle: _tmdbMovie.,
  //     movieID: _tmdbMovie.,
  //     overview: _tmdbMovie.,
  //     posterPath: _tmdbMovie.,
  //     rating: _tmdbMovie.,
  //     releaseDate: _tmdbMovie.,
  //     revenue: _tmdbMovie.,
  //     runtime: _tmdbMovie.,
  //     tmdbRating: _tmdbMovie.,
  //     tmdbVoteCount: _tmdbMovie.,
  //     watchDate: _tmdbMovie.,
  //     watched: string_tmdbMovie.,
  //   }
  // }

}


