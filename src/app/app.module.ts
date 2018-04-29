import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';


// native
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../providers/auth/auth';

import { HttpClientModule } from '@angular/common/http';


const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCLvN0wRAvVuYA3ZPY9FiAeT6AJDaxK2PI',
    authDomain: 'vc-web.firebaseapp.com',
    databaseURL: 'https://vc-web.firebaseio.com',
    projectId: 'vc-web',
    storageBucket: 'vc-web.appspot.com',
    messagingSenderId: '340692511205'
  }
};

@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          tabsPlacement: 'bottom',
        },
        android: {
          tabsPlacement: 'top'
        }
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    Geolocation,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
