import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth'

import {
  addDoc,
  Firestore,
  collection,
  getDoc
} from '@angular/fire/firestore'
import { getDocs } from '@firebase/firestore';

import { UUID } from 'angular2-uuid';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbInstance: any;
  private uuid: string | undefined;
  private movieArray: any = [];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {
    this.getAllMovies();
  }

  /**
   * @description this is an alert message
   * @param alertMessage the message you want to be alerted
   */
  myAlert(alertMessage: string) {
    alert(alertMessage);
  }

  /**
   * @name handleRegister
   * @description handles the register method
   * @param value the value of the form that will be entered into the firestore db
   */
  handleRegister(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  /**
   * @name handleLogin
   * @description handles the login method
   * @param value the value of the form that will be entered into the firestore db
   */
  handleLogin(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.myAlert(error);
      });
  }

  /**
   * @name addUserInfo
   * @description this the method that will hold the user data in the firestore db 
   * (real addUser will use firebase authentication)
   * @param value the value of the form that will be entered into the firestore db
   * 
   */
  addUserInfo(value: any) {
    const dbInstance = collection(this.firestore, 'Users');
    addDoc(dbInstance, value)
      .then(() => {
        console.log("added user");
      })
      .catch((error) => {
        this.myAlert(error.message);
      });

  }


  addMovie(movieID: number, date: Date) {

  }

  /**
   * 
   * @name getAllMovies
   * @description this method accesses the firestore db and returns data from the collection 'Movies'
   * @returns array of 
   */
  getAllMovies() {
    const dbInstance = collection(this.firestore, 'Movies');
    getDocs(dbInstance)
      .then((response) => {
        this.movieArray = [...response.docs.map((item) => {
          return { ...item.data() }
        })];
      })
  }

  /**
   * @name generateUUID
   * @description this method returns a unique id for ids in lists or the db
   * @returns a string with a unique id
   */
  generateUUID(): string {
    this.uuid = UUID.UUID();
    return this.uuid;
  }


}
