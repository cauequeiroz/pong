import { Application, Text, TextStyle } from "pixi.js";
import { ScoreSystem } from "../System/ScoreSystem";

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

    // REMOVE
    console.log(this.application);
  }

  private createElement(): Text {
    const style = new TextStyle({
      fontFamily: "Courier New"
    });

    const heroScore = new Text(this.getScoreText(), style);

    return heroScore;
  }

  public getElement(): Text {
    return this.element;
  }

  public abstract getScoreText(): string;
  public abstract defineElementPosition(): void;
  public abstract update(): void;
}