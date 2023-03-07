import { createReducer, on } from '@ngrx/store';
import { MoviesStatesInterface } from './stateInterface';
import * as MoviesActions from './actions';

export const initialState: MoviesStatesInterface = {
	isLoading: false,
	movies: [],
	error: null,
};

export const reducers = createReducer(
	initialState,
	on(MoviesActions.getMovies, (state: any) => ({
		...state,
		isloading: true,
	}))
);
