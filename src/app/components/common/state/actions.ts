import { createAction, props } from '@ngrx/store';

export const getMovies = createAction('[Movies] Get Movies');
export const getMoviesSuccess = createAction(
	'[Movies] Get Movies Success',
	props<{ movies: any }>()
);
export const getMoviesFailure = createAction(
	'[Movies] Get Movies Failure',
	props<{ error: any }>()
);

export const getUsers = createAction('[Users] Get Users');
