import { Application, Container } from "pixi.js";
import { Ball } from "../Entity/Ball";
import { LeftPaddle } from "../Entity/LeftPaddle";
import { PlayerOneScore } from "../Entity/PlayerOneScore";
import { PlayerTwoScore } from "../Entity/PlayerTwoScore";
import { RightPaddle } from "../Entity/RightPaddle";
import { CollisionSystem } from "../System/CollisionSystem";
import { KeyboardSystem } from "../System/KeyboardSystem";
import { ScoreSystem } from "../System/ScoreSystem";

export class GameScene extends Container {
  private application: Application;

  private ball: Ball;
  private leftPaddle: LeftPaddle;
  private rightPaddle: RightPaddle;

  private playerOneScore: PlayerOneScore;
  private playerTwoScore: PlayerOneScore;

  private collisionSystem: CollisionSystem;
  private keyboardSystem: KeyboardSystem;
  private scoreSystem: ScoreSystem;

  constructor(application: Application) {
    super();
    
    this.application = application;
    
    // Create systems
    this.collisionSystem = new CollisionSystem();
    this.keyboardSystem = new KeyboardSystem();
    this.scoreSystem = new ScoreSystem();

    // Create entities
    this.ball = new Ball(this.application, this.scoreSystem);
    this.leftPaddle = new LeftPaddle(this.application, this.keyboardSystem);
    this.rightPaddle = new RightPaddle(this.application);
    this.playerOneScore = new PlayerOneScore(this.application, this.scoreSystem);
    this.playerTwoScore = new PlayerTwoScore(this.application, this.scoreSystem);
    
    // Add to game
    this.addChild(this.ball.getElement());
    this.addChild(this.leftPaddle.getElement());
    this.addChild(this.rightPaddle.getElement());
    this.addChild(this.playerOneScore.getElement());
    this.addChild(this.playerTwoScore.getElement());

    // Ticker
    this.application.ticker.add(this.update, this);
  }

  private update(time: number) {
    this.ball.update(time);
    this.leftPaddle.update(time);
    this.rightPaddle.update(time);
    this.playerOneScore.update();
    this.playerTwoScore.update();
    
    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.leftPaddle.getBounds())) {
      this.ball.collisionWithLeftPaddle();
    }

    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.rightPaddle.getBounds())) {
      this.ball.collisionWithRightPaddle();
    }
  }
}