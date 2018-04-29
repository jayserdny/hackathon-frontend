import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email: string;
  private password: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthProvider) {
  }


  private login() {
    let loading = this.loading.create({
      content: "Please wait..."
    });

    loading.present()
    this.auth.login(this.email, this.password).then((data: any) => {
      if (data.status === false) {
        let alert = this.alertCtrl.create({
          message: 'This username does not exists'
        });

        alert.present();
      }

      else if (data.status === true) {
        loading.dismiss();
      }
    })
  }

  private openPage(page: string): void {
    this.navCtrl.push(page);
  }

}
