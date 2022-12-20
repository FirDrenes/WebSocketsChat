import {Component, Input, OnInit} from '@angular/core';
import {Message, TextMessage} from "../Message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];

  @Input()
  public webSocket!: WebSocket;
  public uid: string = "";

  constructor() {
    this.messages = [];
  }

  ngOnInit(): void {
    this.webSocket.addEventListener('message',(msg) => {
      const receivedData = JSON.parse(msg.data);
      const uid = receivedData.uid;
      const message = receivedData.message;
      if (message.type === "INIT_MESSAGE") {
        console.log("uid received", receivedData.uid);
        this.uid = receivedData.uid;
      }
      if (message.type === 'TEXT_MESSAGE') {
        console.log("new message!");
        this.receiveMessage(message.text, uid);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  sendMessage(event: { message: string }) {
    const obj = {type: 'TEXT_MESSAGE', text: event.message};
    this.webSocket.send(JSON.stringify(obj));
  }

  receiveMessage(text: string, uid: string = "") {
    let message = new TextMessage(uid, text);
    this.messages.push(message);
  }

  isReply(msg: Message): boolean{
    return this.uid !== msg.uid;
  }
}
