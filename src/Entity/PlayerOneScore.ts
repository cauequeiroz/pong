import { Application } from "pixi.js";
import { ScoreSystem } from "../System/ScoreSystem";
import { PlayerScore } from "./PlayerScore";

export class PlayerOneScore extends PlayerScore {
  
  constructor(application: Application, scoreSystem: ScoreSystem) {
    super(application, scoreSystem);
  }

  public getScoreText(): string {
    return `Player 1: ${this.score}`;
  }

  public defineElementPosition(): void {
    const text = this.getElement();

    text.x = 10;
    text.y = 10;
  }

  public update(): void {
    if (this.scoreSystem.getPlayerOneScore() !== this.score) {
      this.score = this.scoreSystem.getPlayerOneScore();
      this.getElement().text = this.getScoreText();
    }
  }
}