import { createReducer, on } from '@ngrx/store';
import { MoviesStatesInterface } from './stateInterface';
import * as MoviesActions from './actions';

export const initialState: MoviesStatesInterface = {
	isLoading: false,
	movies: [],
	error: null,
	users: {
		isLoading: false,
	},
};

export const reducers = createReducer(
	initialState,
	on(MoviesActions.getMovies, (state: any) => ({
		...state,
		isloading: true,
	})),

	on(MoviesActions.getMoviesSuccess, (state: any, action: any) => ({
		...state,
		isloading: false,
		movies: action.movies,
	})),

	on(MoviesActions.getMoviesFailure, (state: any, action: any) => ({
		...state,
		isloading: false,
		error: action.error,
	})),

	on(MoviesActions.getUsers, (state: any) => ({
		...state,
		isloading: true,
	}))
);
