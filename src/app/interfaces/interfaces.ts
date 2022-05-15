import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

export interface Movie {
    budget: number;
    collectionID: number;
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

export interface SimpleDataSource<T> extends DataSource<T> {
    connect(): Observable<T[]>;
    disconnect(): void;
  }
