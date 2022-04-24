import { Container, Graphics, Rectangle, Text, TextStyle, Ticker } from "pixi.js";
import { Sound } from "@pixi/sound";

export class Scene extends Container {
  private gameIsRunning: boolean = false;

  private readonly screenWidth: number;
  private readonly screenHeight: number;

  private ball: Graphics;
  private ball_x_speed: number = 10;
  private ball_y_speed: number = 10;

  private button: Graphics;
  private leftPaddle: Graphics;
  private rightPaddle: Graphics;
  private isRightPaddleUping:boolean = true;

  private keyboard: { [index:string]: boolean } = {};

  private heroScore: number = 0;
  private enemyScore: number = 0;
  private heroScoreText: Text;
  private enemyScoreText: Text;

  private pongSound: Sound;
  private pongHitSound: Sound;

  constructor(screenWidth: number, screenHeight: number) {
    super();
    
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    console.log(this.screenHeight)

    // GRAPHICS
    const leftPaddle = new Graphics();
    leftPaddle.beginFill(0x2c3e50);
    leftPaddle.drawRect(0, 0, 25, 200);
    leftPaddle.endFill();
    this.leftPaddle = leftPaddle;
    leftPaddle.x = 10;
    leftPaddle.y = 400;

    const rightPaddle = new Graphics();
    rightPaddle.beginFill(0x2c3e50);
    rightPaddle.drawRect(0, 0, 25, 200);
    rightPaddle.endFill();
    this.rightPaddle = rightPaddle;
    rightPaddle.x = (this.screenWidth - 25 - 10);
    rightPaddle.y = 400;

    this.addChild(leftPaddle);
    this.addChild(rightPaddle);

    const ball = new Graphics();
    ball.beginFill(0x2c3e50);
    ball.lineStyle(5, 0x34495e);
    ball.drawCircle(0, 0, 20);
    ball.endFill();

    ball.x = this.screenWidth / 2;
    ball.y = this.screenHeight / 2;

    this.addChild(ball);
    this.ball = ball;

    const button = new Graphics();
    button.beginFill(0x2ecc71);
    button.drawRect(((this.screenWidth / 2) - 50), 10, 100, 50);
    button.endFill();
    button.interactive = true;
    button.on("click", this.changeGameState, this);
    this.addChild(button);
    this.button = button;

    // TEXT
    const style = new TextStyle({
      fontFamily: "Courier New"
    });

    const heroScore = new Text('Hero: 0', style);
    heroScore.x = 10;
    const enemyScore = new Text('Enemy: 0', style);
    enemyScore.x = this.screenWidth - enemyScore.width - 10;

    const UI = new Container();
    UI.y = 10;
    UI.addChild(heroScore);
    UI.addChild(enemyScore);
    this.heroScoreText = heroScore;
    this.enemyScoreText = enemyScore;

    this.addChild(UI);


    // ANIMATING BALL

    Ticker.shared.add(this.updateBall, this);
    Ticker.shared.add(this.updatePaddle, this);

    // KEYBOARD INTERACTION
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    // SOUND
    this.pongSound = Sound.from("pong.wav");
    this.pongHitSound = Sound.from("pong-hit.wav");
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keyboard[event.code] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keyboard[event.code] = false;
  }

  private updateBall(time: number): void {
    if (!this.gameIsRunning) return;

    this.ball.x = this.ball.x + this.ball_x_speed * time;
    this.ball.y = this.ball.y + this.ball_y_speed * time;

    // Check ball agains paddles
    if (this.checkCollision(this.ball.getBounds(), this.leftPaddle.getBounds())) {
      this.ball_x_speed = Math.abs(this.ball_x_speed);
      this.pongHitSound.play();
      return;
    }
    
    if (this.checkCollision(this.ball.getBounds(), this.rightPaddle.getBounds())) {
      this.ball_x_speed = Math.abs(this.ball_x_speed) * -1;
      this.pongHitSound.play();
      return;
    }

    // Check ball against walls
    if (this.ball.x > this.screenWidth - (this.ball.width / 2)) {
      this.ball_x_speed = Math.abs(this.ball_x_speed) * -1;
      this.heroScore += 1;
      this.heroScoreText.text = `Hero: ${this.heroScore}`; 
      this.pongSound.play();
    }

    if (this.ball.y > this.screenHeight - (this.ball.height / 2)) {
      this.ball_y_speed = Math.abs(this.ball_y_speed) * -1;
      this.pongSound.play();
    }

    if (this.ball.x < 0 + (this.ball.width / 2)) {
      this.ball_x_speed = Math.abs(this.ball_x_speed);
      this.enemyScore += 1;
      this.enemyScoreText.text = `Enemy: ${this.enemyScore}`;
      this.pongSound.play();
    }

    if (this.ball.y < 0 + (this.ball.height / 2)) {
      this.ball_y_speed = Math.abs(this.ball_y_speed);
      this.pongSound.play();
    }  
  }

  private checkCollision(rect1: Rectangle, rect2: Rectangle): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }


  private changeGameState(): void {
    this.gameIsRunning = !this.gameIsRunning;
    this.button.tint = this.gameIsRunning ? 0xe74c3c : 0x2ecc71;
  }

  private updatePaddle(time: number): void {
    if (!this.gameIsRunning) return;

    // Left Paddle
    if (this.keyboard['ArrowUp'] && this.leftPaddle.y > 0) {
      this.leftPaddle.y -= 5 * time;
    }

    if (this.keyboard['ArrowDown'] && this.leftPaddle.y < this.screenHeight - this.leftPaddle.height) {
      this.leftPaddle.y += 5 * time;
    }

    // RightPaddle
    this.rightPaddle.y += (this.isRightPaddleUping ? -5 : 5) * time;

    if (this.rightPaddle.y < 0) {
      this.isRightPaddleUping = false;
    }

    if (this.rightPaddle.y > this.screenHeight - this.rightPaddle.height) {
      this.isRightPaddleUping = true;
    }
  }
}