import { createSelector } from '@ngrx/store';
import { AppStateInterface } from './app-state.interface';

export const selectMoviesFeature = (state: AppStateInterface) => {
	return state.movies;
};

export const isLoadingSelector = createSelector(selectMoviesFeature, state => {
	return state.isLoading;
});

export const moviesSelector = createSelector(selectMoviesFeature, state => {
	return state.movies;
});

export const errorSelector = createSelector(selectMoviesFeature, state => {
	return state.error;
});
