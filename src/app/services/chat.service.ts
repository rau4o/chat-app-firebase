import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ChatMessage} from '../models/chat-message.model';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: any;
  chatMessage: ChatMessage;
  userName: any;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      console.log(this.getUser(), 1);
      this.getUser().subscribe(a => {
        console.log(a);
        this.userName = a.displayName ?? '';
      });
    });
  }

  // tslint:disable-next-line:typedef
  public getUser(): any {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.angularFireDatabase.object(path);
  }

  public getUsers(): any {
    const path = '/users';
    return this.angularFireDatabase.list(path);
  }

  public sendMessage(message: string): any {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    console.log(this.userName);
    this.chatMessages = this.getMessages();
    console.log(this.getMessages());
    console.log(this.chatMessages);
    this.chatMessages.push({
      message,
      timeStamp,
      userName: this.userName ?? 'test',
      email
    });
    console.log('called');
  }

  private getTimeStamp(): string {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return date + ' ' + time;
  }

  public getMessages(): any {
    return this.angularFireDatabase.list<any>('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

}
