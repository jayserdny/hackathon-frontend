import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  public signup(email: string, password: string) {
    return new Promise(resolve => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
        if (data.code === 'auth/weak-password') {
          resolve({
            status: false,
            msg: 'Password should be at least 6 characters'
          });
        }
      }).catch(err => {
        if (err.code === 'auth/weak-password') {
          resolve({
            status: false,
            msg: 'Password should be at least 6 characters'
          });
        }
      })
    });
    
  }

  public login(email: string, password: string) {
    return new Promise(resolve => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
        if (data.code === 'auth/user-not-found') {
          resolve({
            status: false,
            msg: 'This username does not exist'
          });
        }
        else {
          resolve({
            status: true,
            msg: data
          });
        }
      }).catch(error => {
        console.log(error)
        if (error.code === 'auth/user-not-found') {
          resolve({
            status: false,
            msg: 'This username does not exist'
          });
        }
      })
    })
  }

  public logout() {
    
    this.afAuth.auth.signOut();
  }

}
