import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth'
import {
  addDoc, Firestore, collection
} from '@angular/fire/firestore'

import { UUID } from 'angular2-uuid';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbInstance: any;
  private uuid: string | undefined;

  constructor(
    private auth: Auth,
  ) {

  }

  myAlert(alertMessage: string) {
    alert(alertMessage);
  }

  handleRegister(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  handleLogin(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  addUser() {

  }

  addMovie(movieID: number, date: Date) {

  }

  generateUUID() {
    this.uuid = UUID.UUID();
    return this.uuid;
  }


}
