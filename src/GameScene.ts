import { Application, Container } from "pixi.js";
import { Ball } from "./Entity/Ball";
import { LeftPaddle } from "./Entity/LeftPaddle";
import { RightPaddle } from "./Entity/RightPaddle";
import { CollisionSystem } from "./System/CollisionSystem";
import { KeyboardSystem } from "./System/KeyboardSystem";

export class GameScene extends Container {
  private application: Application;

  private ball: Ball;
  private leftPaddle: LeftPaddle;
  private rightPaddle: RightPaddle;

  private collisionSystem: CollisionSystem;
  private keyboardSystem: KeyboardSystem;

  constructor(application: Application) {
    super();
    
    this.application = application;
    
    // Create systems
    this.collisionSystem = new CollisionSystem();
    this.keyboardSystem = new KeyboardSystem();

    // Create entities
    this.ball = new Ball(this.application);
    this.leftPaddle = new LeftPaddle(this.application, this.keyboardSystem);
    this.rightPaddle = new RightPaddle(this.application);
    
    // Add to game
    this.addChild(this.ball.getElement());
    this.addChild(this.leftPaddle.getElement());
    this.addChild(this.rightPaddle.getElement());

    // Ticker
    this.application.ticker.add(this.update, this);
  }

  private update(time: number) {
    this.ball.update(time);
    this.leftPaddle.update(time);
    this.rightPaddle.update(time);
    
    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.leftPaddle.getBounds())) {
      this.ball.collisionWithLeftPaddle();
    }

    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.rightPaddle.getBounds())) {
      this.ball.collisionWithRightPaddle();
    }
  }
}