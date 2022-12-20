import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {filter, fromEvent, tap} from "rxjs";
import {DrawMessage} from "../Message";

@Component({
  selector: 'app-draw-table',
  templateUrl: './draw-table.component.html',
  styleUrls: ['./draw-table.component.scss']
})
export class DrawTableComponent implements OnInit {

  @ViewChild('canvasElement')
  private canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  @Input()
  webSocket!: WebSocket;
  uid = "";

  constructor() {}

  ngOnInit(): void {
    this.webSocket.addEventListener('message', (msg) => {
      console.log("catch message in draw table");
      const receivedData = JSON.parse(msg.data);
      const uid = receivedData.uid;
      const message = receivedData.message;
      if (message.type === "INIT_MESSAGE") {
        console.log("uid received", receivedData.uid);
        this.uid = receivedData.uid;
      }
      if(message.type === 'DRAW_MESSAGE') {
        const drawMessage = new DrawMessage(uid, message.event);
        this.receiveMessage(drawMessage);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initContext();
    fromEvent<MouseEvent>(this.canvas.nativeElement, 'mousemove')
      .pipe(
        filter((event: MouseEvent) => event.buttons === 1),
        tap((event: MouseEvent) => {
          let rect = this.canvas.nativeElement.getBoundingClientRect();
          this.webSocket.send(JSON.stringify({type: 'DRAW_MESSAGE', event:
              {offsetX: event.offsetX, offsetY: event.offsetY, movementX: event.movementX, movementY: event.movementY}}));
        })
      )
      .subscribe(this.localDraw.bind(this));
    console.log("this websocket", this.webSocket);
  }

  initContext() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  localDraw(event: MouseEvent): void {
    this.drawCircle(event, '#178fab');
  }

  receiveMessage(message: DrawMessage){
    console.log('draw message received');
    const event = message.event as MouseEvent;
    let color = message.uid === this.uid ? '#178fab' : 'gray';
    this.drawCircle(event, color);
  }

  drawCircle(event: MouseEvent, color: string): void {
    this.ctx.beginPath();
    console.log(event.movementX);
    this.ctx.moveTo(event.offsetX - event.movementX, event.offsetY - event.movementY);
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 8;
    this.ctx.stroke();
    this.ctx.arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.closePath();
    this.ctx.fill();
  }
}
