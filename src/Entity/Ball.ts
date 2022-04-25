import { Application, Graphics, Rectangle } from "pixi.js";
import { ScoreSystem } from "../System/ScoreSystem";
import { theme } from '../theme';

export class Ball {
  private element: Graphics;
  private application: Application;
  private scoreSystem: ScoreSystem;
  private xSpeed: number;
  private ySpeed: number;

  constructor(application: Application, scoreSystem: ScoreSystem) {
    this.application = application;
    this.scoreSystem = scoreSystem;
    this.element = this.createElement();
    this.xSpeed = 5;
    this.ySpeed = 5;
  }

  private createElement(): Graphics {
    const ball = new Graphics();
    ball.beginFill(theme.ballColor);
    ball.drawRect(0, 0, 20, 20);
    ball.endFill();

    ball.x = this.application.screen.width / 2;
    ball.y = this.application.screen.height / 2;

    return ball;
  }

  public getElement(): Graphics {
    return this.element;
  }

  public getBounds(): Rectangle {
    return this.element.getBounds();
  }

  public update(time: number) {
    const ball = this.getElement();
    const screenWidth = this.application.screen.width;
    const screenHeight = this.application.screen.height;

    ball.x += this.xSpeed * time;
    ball.y += this.ySpeed * time;
    
    // Collision against left wall
    if (ball.x < 0 + (ball.width / 2)) {
      this.xSpeed = Math.abs(this.xSpeed);
      this.scoreSystem.upPlayerOneScore();
    }

    // Collision against right wall
    if (ball.x > screenWidth - (ball.width / 2)) {
      this.xSpeed = -Math.abs(this.xSpeed);
      this.scoreSystem.upPlayerTwoScore();
    }
    
    // Collision against top wall
    if (ball.y < 0) {
      this.ySpeed = Math.abs(this.ySpeed);
    }  

    // Collision against bottom wall
    if (ball.y > screenHeight - (ball.height / 2)) {
      this.ySpeed = -Math.abs(this.ySpeed);
    }
  }

  public collisionWithLeftPaddle() {
    this.xSpeed = Math.abs(this.xSpeed);
  }

  public collisionWithRightPaddle() {
    this.xSpeed = -Math.abs(this.xSpeed);
  }
}