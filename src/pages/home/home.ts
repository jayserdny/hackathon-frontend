import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 0
};

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
  private selected: boolean = false;
  private hospital_title: string = '';
  public rate = 4;
  private description: string = '';
  private places: any = [];
  cover = 'https://ionicframework.com/dist/preview-app/www/assets/img/card-saopaolo.png'


  constructor(public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private auth: AuthProvider,
    public http: HttpClient,
    private platform: Platform,
    private geolocation: Geolocation) {

  }

  openPage(name: string, title, location, rate): void {
    this.navCtrl.push(name, {
      title: title,
      location: location,
      rate: rate
    });
  }

  logout() {
    this.auth.logout();
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });

  }

  private initMap(): void {
    map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 40.740642, lng: -73.9851237 },
      zoom: 15,
      disableDefaultUI: true, // a way to quickly hide all controls
    });

    var noPoi = [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    map.setOptions({ styles: noPoi });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: { lat: 40.740642, lng: -73.9851237 },
      radius: 10000,
      type: ['hospital']
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
          this.places.push(results[i]);
        }
        console.log(this.places)
      }

    });
  }


  createMarker(place) {
    var image = {
      url: place.icon, // image is 512 x 512
      scaledSize : new google.maps.Size(32, 32)
  };
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(place.name);
      this.openPage('SinglePage', place.name, place.vicinity, place.rating);
    });
  }

}
