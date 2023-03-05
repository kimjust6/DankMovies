// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	FIREBASE: {
		projectId: process.env['FIRE_PROJECT_ID'] || process.env.FIRE_PROJECT_ID || "",
		appId: process.env['FIRE_APP_ID'] || process.env.FIRE_APP_ID || "",
		storageBucket: process.env['FIRE_STORAGE_BUCKET'] || process.env.FIRE_STORAGE_BUCKET || "",
		locationId: process.env['FIRE_LOCATION_ID'] || process.env.FIRE_LOCATION_ID || "",
		apiKey: process.env['FIRE_API_KEY'] || process.env.FIRE_API_KEY || "",
		authDomain: process.env['FIRE_AUTH_DOMAIN'] || process.env.FIRE_AUTH_DOMAIN || "",
		messagingSenderId: process.env['FIRE_MESSAGING_SENDER_ID'] || process.env.FIRE_MESSAGING_SENDER_ID || "",
		measurementId: process.env['FIRE_MEASUREMENT_ID'] || process.env.FIRE_MEASUREMENT_ID || "",
	},
	GOOGLE: {
		CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || process.env.GOOGLE_CLIENT_ID || '',
		CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'] || process.env.GOOGLE_CLIENT_SECRET || '',
	},
	TMDB: {
		API_KEY_V3: process.env['TMDB_API_KEY_V3'] || process.env.TMDB_API_KEY_V3 || '',
		API_KEY_V4: process.env['TMDB_API_KEY_V4'] || process.env.TMDB_API_KEY_V4 || '',
	},
	production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
