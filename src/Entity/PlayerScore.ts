import { Application, Text, TextStyle } from "pixi.js";
import { ScoreSystem } from "../System/ScoreSystem";
import { theme } from "../theme";

export class PlayerScore {
  private element: Text;
  
  protected application: Application;
  protected scoreSystem: ScoreSystem;
  
  protected playerOneScore: number;
  protected playerTwoScore: number;

  constructor(application: Application, scoreSystem: ScoreSystem) {
    this.application = application;
    this.scoreSystem = scoreSystem;

    this.playerOneScore = this.scoreSystem.getPlayerOneScore();
    this.playerTwoScore = this.scoreSystem.getPlayerTwoScore();

    this.element = this.createElement();
    this.defineElementPosition();
  }

  private createElement(): Text {
    const style = new TextStyle({
      fontFamily: "Courier New",
      fontWeight: "900",
      fill: theme.scoreTextColor
    });

    return new Text(this.getScoreText(), style);
  }

  public getElement(): Text {
    return this.element;
  }

  public getScoreText(): string {
    return `${this.playerOneScore} : ${this.playerTwoScore}`;
  }

  public defineElementPosition(): void {
    const text = this.getElement();

    text.anchor.set(0.5, 0);
    text.x = this.application.screen.width / 2;
    text.y = 10;
  }

  public update(): void {
    const hasScoreChanged =
       this.scoreSystem.getPlayerOneScore() !== this.playerOneScore
    || this.scoreSystem.getPlayerTwoScore() !== this.playerTwoScore;
    
      if (hasScoreChanged) {
      this.playerOneScore = this.scoreSystem.getPlayerOneScore();
      this.playerTwoScore = this.scoreSystem.getPlayerTwoScore();

      this.getElement().text = this.getScoreText();
    }
  }
}