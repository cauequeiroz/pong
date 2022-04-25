import { Application, Text, TextStyle } from "pixi.js";
import { ScoreSystem } from "../../System/ScoreSystem";
import { theme } from "../../theme";

export abstract class PlayerScore {
  private element: Text;
  
  protected application: Application;
  protected scoreSystem: ScoreSystem;
  protected score: number;

  constructor(application: Application, scoreSystem: ScoreSystem) {
    this.application = application;
    this.scoreSystem = scoreSystem;

    this.score = this.scoreSystem.getPlayerOneScore();
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

  public abstract getScoreText(): string;
  public abstract defineElementPosition(): void;
  public abstract update(): void;
}