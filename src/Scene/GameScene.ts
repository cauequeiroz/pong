import { Application, Container } from "pixi.js";
import { Ball } from "../Entity/Ball";
import { LeftPaddle } from "../Entity/Paddle/LeftPaddle";
import { RightPaddle } from "../Entity/Paddle/RightPaddle";
import { PlayerScore } from "../Entity/PlayerScore";
import { CollisionSystem } from "../System/CollisionSystem";
import { CoreMechanics } from "../System/CoreMechanics";
import { KeyboardSystem } from "../System/KeyboardSystem";
import { ScoreSystem } from "../System/ScoreSystem";

export class GameScene extends Container {
  private ball: Ball;
  private leftPaddle: LeftPaddle;
  private rightPaddle: RightPaddle;
  private playerScore: PlayerScore;  
  private collisionSystem: CollisionSystem;

  constructor(application: Application) {
    super();
    
    // Setup core mechanics
    const coreMechanics = CoreMechanics.getInstance();
    coreMechanics.addMechanic('application', application);
    coreMechanics.addMechanic('keyboard', new KeyboardSystem());
    coreMechanics.addMechanic('score', new ScoreSystem());

    // Create systems
    this.collisionSystem = new CollisionSystem();

    // Create entities
    this.ball = new Ball();
    this.leftPaddle = new LeftPaddle();
    this.rightPaddle = new RightPaddle();
    this.playerScore = new PlayerScore();
    
    // Add to game
    this.addChild(this.ball.getElement());
    this.addChild(this.leftPaddle.getElement());
    this.addChild(this.rightPaddle.getElement());
    this.addChild(this.playerScore.getElement());

    // Ticker
    application.ticker.add(this.update, this);
  }

  private update(time: number) {
    this.ball.update(time);
    this.leftPaddle.update(time);
    this.rightPaddle.update(time);
    this.playerScore.update();
    
    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.leftPaddle.getBounds())) {
      this.ball.collisionWithLeftPaddle();
    }

    if (this.collisionSystem.checkCollision(this.ball.getBounds(), this.rightPaddle.getBounds())) {
      this.ball.collisionWithRightPaddle();
    }
  }
}