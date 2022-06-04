import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ChatMessage} from '../models/chat-message.model';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: any;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  public sendMessage(message: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message,
      timeStamp,
      userName: this.userName,
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
    return this.angularFireDatabase.list('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

}
