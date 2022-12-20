import { Component } from '@angular/core';
import {fromEvent, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';
  uid = "";
  public webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:9000');
  }

  get webSocketObservable(): Observable<any> {
    return fromEvent(this.webSocket, 'message');
  }
}
