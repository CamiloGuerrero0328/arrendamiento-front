// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090',
  //apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyBUErSjab_Bt5OWfeX9kRSI4R0zv3_AUYE",
    authDomain: "arrendamiento-pc.firebaseapp.com",
    databaseURL: "https://arrendamiento-pc.firebaseio.com",
    projectId: "arrendamiento-pc",
    storageBucket: "arrendamiento-pc.appspot.com",
    messagingSenderId: "1034453231677",
    appId: "1:1034453231677:web:6a7e8415519c74412de254"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
