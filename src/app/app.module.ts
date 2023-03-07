// modules
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

// components
import { AppComponent } from './app.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page-404/page-404.component';

// services
import { tmdbAPIService } from './services/tmdb-api.service';
import { FirebaseService } from './services/firebase.service';

// firestore
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { WatchlistModalComponent } from './components/watchlist-modal/watchlist-modal.component';
import { CommonModalComponent } from './components/common/common-modal/common-modal.component';
import {
	GoogleLoginProvider,
	FacebookLoginProvider,
	SocialAuthServiceConfig,
	SocialLoginModule,
} from '@abacritt/angularx-social-login';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './components/common/state/reducers';

@NgModule({
	declarations: [
		AppComponent,
		HomepageComponent,
		LoginComponent,
		MovieDetailsComponent,
		MovieSearchComponent,
		NavbarComponent,
		Page404Component,
		WatchlistModalComponent,
		CommonModalComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		MatDatepickerModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatCardModule,
		ReactiveFormsModule,
		SocialLoginModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
			features: {
				pause: false,
				lock: true,
				persist: true,
			},
		}),
		StoreModule.forFeature('movies', reducers),
		provideFirebaseApp(() => initializeApp(environment.FIREBASE)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
	],
	providers: [
		tmdbAPIService,
		FirebaseService,

		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'fill' },
		},
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(
							environment.GOOGLE.CLIENT_ID
						),
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('clientId'),
					},
				],
				onError: err => {
					console.error(err);
				},
			} as SocialAuthServiceConfig,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
