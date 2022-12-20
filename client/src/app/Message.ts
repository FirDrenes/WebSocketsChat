export abstract class Message{
  private _type: string;
  private _uid: string;

  protected constructor(type: string, uid: string) {
    this._type = type;
    this._uid = uid;
  }

  get type(){
    return this._type;
  }

  get uid(){
    return this._uid;
  }

  set uid(uid: string){
    this._uid = uid;
  }

  abstract setData(data: any): void;
  abstract getData(): any;
}

export class InitMessage extends Message{
  public constructor(uid: string = "") {
    super("INIT_MESSAGE", uid);
  }

  override getData(): any {
    return this.uid;
  }

  override setData(data: any) {
    this.uid = data;
  }
}

export class TextMessage extends Message{
  private _text: string;
  public constructor(uid: string = "", text: string = "") {
    super("TEXT_MESSAGE", uid);
    this._text = text;
  }

  public get text(){
    return this._text;
  }

  public set text(text: string){
    this._text = text;
  }

  override setData(data: any) {
    this.text = data;
  }

  override getData(){
    return this.text;
  }
}

export class DrawMessage extends Message{
  private _event: any;
  public constructor(uid: string = "", event: any = undefined) {
    super("DRAW_MESSAGE", uid);
    this._event = event;
  }

  get event(){
    return this._event;
  }

  set event(event: any){
    this._event = event;
  }

  override setData(data: any) {
    this.event = data;
  }

  override getData(): any {
    return this.event;
  }
}

