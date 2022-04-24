import { Application } from "pixi.js";
import { Paddle } from "./Paddle";

export class LeftPaddle extends Paddle {
  constructor(application: Application) {
    super(application);
  }

  public defineElementPosition(): void {
    const paddle = this.getElement();

    paddle.x = 10;
    paddle.y = 400;
  }

  public update(time: number): void {
    const paddle = this.getElement();
    const screenHeight = this.application.screen.height;

    paddle.y += this.ySpeed * time;

    if (paddle.y < 0) {
      this.ySpeed = Math.abs(this.ySpeed);
    } else if (paddle.y > screenHeight - paddle.height) {
      this.ySpeed = -Math.abs(this.ySpeed);
    }
  }
}