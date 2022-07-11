import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { User } from '../interfaces/user-interface';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = ''
  messages: any = [];
  user !: User;
  constructor(
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.currentUserValue;
    Pusher.logToConsole = true;
    const pusher = new Pusher('741fc81193217e3589a0', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat-app');
    channel.bind('message', (data: { id: string; name: string; message: string }) => {
      this.messages.push(data);
      console.log('data', data);
    });
  }

  submit() {
    let input = {
      message: this.message
    }
    this.userService.callPusher(input).subscribe(() => this.message = '');
  }

}
