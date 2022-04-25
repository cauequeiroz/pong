import { Application, Graphics, Rectangle } from "pixi.js";
import { CoreMechanics } from "../../System/CoreMechanics";
import { theme } from '../../theme';

export abstract class Paddle {
  private element: Graphics;
  
  protected application: Application; 
  protected ySpeed: number;

  constructor() {
    const coreMechanics = CoreMechanics.getInstance();

    this.application = coreMechanics.mechanics.application;
    this.ySpeed = 5;
    
    this.element = this.createElement();
    this.defineElementPosition();
  }

  private createElement(): Graphics {
    const paddle = new Graphics();
    paddle.beginFill(theme.paddleColor);
    paddle.drawRect(0, 0, 25, 200);
    paddle.endFill();

    return paddle;
  }

  public getElement(): Graphics {
    return this.element;
  }

  public getBounds(): Rectangle {
    return this.element.getBounds();
  }

  public abstract defineElementPosition(): void;
  public abstract update(time: number): void;
}