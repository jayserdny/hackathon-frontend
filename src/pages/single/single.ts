import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {

  private title: string = '';
  private rate: number = 0.0;
  private location: string = '';
  private coords: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  ) {

    this.title = this.navParams.get('title');
    this.rate = this.navParams.get('rate');
    this.location = this.navParams.get('location');
    this.coords = this.navParams.get('place');

  }
}
