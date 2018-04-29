import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  currentPos: Geoposition;
  private location: LatLng;

  constructor(public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private auth: AuthProvider,
    private platform: Platform,
    private geolocation: Geolocation) {

  }

  openPage(name: string): void {
    this.navCtrl.push(name);
  }

  logout() {
    console.log("hiiiii")
    this.auth.logout();
  }

  ngAfterViewInit() {
    // this.platform.ready().then(() => {
    //   this.initMap();
    // });

  }

  private initMap(): void {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);

    this.location = new LatLng(40.74071, -73.98274);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let options = {
        target: this.location,
        zoom: 15
      };

      this.map.moveCamera(options);
      this.map.addMarker({
        animation: 'DROP',
        position: {
          lat: 40.74071,
          lng: -73.98274
        }
      })
    });
  }

}
