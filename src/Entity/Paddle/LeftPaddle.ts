import { CoreMechanics } from "../../System/CoreMechanics";
import { KeyboardSystem } from "../../System/KeyboardSystem";
import { Paddle } from "./Paddle";

export class LeftPaddle extends Paddle {
  private keyboard: KeyboardSystem;
  protected override ySpeed: number;

  constructor() {
    super();

    this.keyboard = CoreMechanics.getInstance().mechanics.keyboard;
    this.ySpeed = 10;
  }

  public defineElementPosition(): void {
    const paddle = this.getElement();

    paddle.x = 10;
    paddle.y = 400;
  }

  public update(time: number): void {
    const paddle = this.getElement();
    const screenHeight = this.application.screen.height;

    if (this.keyboard.isKeyPressed('ArrowUp') && paddle.y > 0) {
      paddle.y += -Math.abs(this.ySpeed) * time;
    }

    if (this.keyboard.isKeyPressed('ArrowDown') && paddle.y < screenHeight - paddle.height) {
      paddle.y += Math.abs(this.ySpeed) * time;
    }
  }
}