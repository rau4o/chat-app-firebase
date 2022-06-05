import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private af: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    this.user = af.authState;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  public login(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((resolve) => {
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      });
  }

  public signUp(email: string, password: string, displayName: string): any {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      })
      .catch(error => console.log(error));
  }

  private setUserData(email: string, displayName: string, status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error, 123));
  }

  private setUserStatus(status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
