import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth) {
    this.initializeApp();

    this.afAuth.authState.subscribe(data => {
      if (data === null || data === undefined) {
        this.rootPage = 'LoginPage';
      }
      else {
        this.rootPage = "HomePage"
      }
    });

    // this.menu = {
    //   header: {
    //     background: '#000000',
    //     picture: '../assets/person.png',
    //     username: 'Steemia',
    //     email: 'steemia@steemia.io',

    //   },
    //   entries: [
    //     { title: 'Home', leftIcon: 'mdi-home', onClick: () => {  } },
    //     { title: 'About', leftIcon: 'information-circle', onClick: () => { } },
    //     { title: 'Login', leftIcon: 'log-in', onClick: () => { } }
    //   ]
    // };

    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#00F0F8FF");
        this.statusBar.styleBlackTranslucent();
      }
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
