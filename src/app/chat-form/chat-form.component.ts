import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  public message = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  public send(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  public handleSubmit(event): void {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
