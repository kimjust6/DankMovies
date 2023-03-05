export const environment = {
	FIREBASE: {
		projectId: process.env.FIRE_PROJECT_ID || "",
		appId: process.env.FIRE_APP_ID || "",
		storageBucket: process.env.FIRE_STORAGE_BUCKET || "",
		locationId: process.env.FIRE_LOCATION_ID || "",
		apiKey: process.env.FIRE_API_KEY || "",
		authDomain: process.env.FIRE_AUTH_DOMAIN || "",
		messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID || "",
		measurementId: process.env.FIRE_MEASUREMENT_ID || "",
	},
	GOOGLE: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
	},
	TMDB: {
		API_KEY_V3: process.env.TMDB_API_KEY_V3 || '',
		API_KEY_V4: process.env.TMDB_API_KEY_V4 || '',
	},
	production: true,
};