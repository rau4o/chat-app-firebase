import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public userEmail: string;
  public userName: string;
  public messageContent: string;
  public timeStamp: Date = new Date();

  @Input() chatMessage: ChatMessage;

  constructor() { }

  ngOnInit( chatMessage = this.chatMessage): void {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }
}
