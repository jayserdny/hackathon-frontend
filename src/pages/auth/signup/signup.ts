import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private email: string;
  private password: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  private signup() {

    this.auth.signup(this.email, this.password).then((data: any) => {
      if (data.msg === 'Password should be at least 6 characters') {
        let alert = this.alertCtrl.create({
          message: 'Password should be at least 6 characters'
        });

        alert.present();
      }
    })

  }

}
