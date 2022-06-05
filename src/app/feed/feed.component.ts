import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chatService.getMessages().valueChanges().subscribe(res => {
      console.log(res);
    });
    console.log(this.feed);
  }

  ngOnChanges(): void {
    this.feed = this.chatService.getMessages();
  }

}
