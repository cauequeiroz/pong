import { Paddle } from "./Paddle";

export class RightPaddle extends Paddle {

  public defineElementPosition(): void {
    const paddle = this.getElement();
    const screenWidth = this.application.screen.width;

    paddle.x = screenWidth - 25 - 10;
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