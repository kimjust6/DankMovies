import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as MovieActions from './actions';

@Injectable()
export class MoviesEffects {
	getMovies$ =
		createEffect(() =>
		this.actions$.pipe(
			ofType(MovieActions.getMovies),
			mergeMap(() => {
				return this.fireStore.getAllMovies().then(
					movies => {
						MovieActions.getMoviesSuccess({ movies });
					}
				);
			})
		);
	);

	constructor(
		private actions$: Actions,
		private fireStore: FirebaseService
	) {}
}
