import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';



export interface Movie {
    budget: number;
    movieCollectionID: number;
    fireCollectionID: string;
    collectionName: string;
    failed: string [];
    filmTitle: string;
    movieID: number;
    overview: string;
    posterPath: string;
    rating: number;
    releaseDate: Date;
    revenue: number;
    runtime: number;
    tmdbRating: number;
    tmdbVoteCount: number;
    watchDate: Date;
    watched: string[];
}

export interface tmdbFindMovieResults
{
    page: number;
    result: tmdbFindMovieResultsArray[];
    total_pages: number;
    total_results: number;
}


export interface tmdbFindMovieResultsArray
{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title:string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


export interface SimpleDataSource<T> extends DataSource<T> {
    connect(): Observable<T[]>;
    disconnect(): void;
  }

