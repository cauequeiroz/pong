export class KeyboardSystem {
  private state: { [index:string]: boolean };

  constructor() {
    this.state = {};

    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.state[event.code] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.state[event.code] = false;
  }

  public isKeyPressed(key: string): boolean {
    return this.state[key];
  }
}