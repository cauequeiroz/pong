import { Application, Text, TextStyle } from "pixi.js";
import { CoreMechanics } from "../System/CoreMechanics";
import { ScoreSystem } from "../System/ScoreSystem";
import { theme } from "../theme";

export class PlayerScore {
  private element: Text;
  private playerOneScore: number;
  private playerTwoScore: number;
  
  protected application: Application;
  protected scoreSystem: ScoreSystem;  

  constructor() {
    const coreMechanics = CoreMechanics.getInstance();

    this.application = coreMechanics.mechanics.application;
    this.scoreSystem = coreMechanics.mechanics.score;

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