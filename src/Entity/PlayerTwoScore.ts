import { PlayerScore } from "./PlayerScore";

export class PlayerTwoScore extends PlayerScore {
  public getScoreText(): string {
    return `Player 2: ${this.score}`;
  }
  public defineElementPosition(): void {
    const screenWidth = this.application.screen.width;

    const text = this.getElement();
    text.anchor.set(1, 0);
    text.x = screenWidth - 10;
    text.y = 10;
  }
  public update(): void {
    if (this.scoreSystem.getPlayerTwoScore() !== this.score) {
      this.score = this.scoreSystem.getPlayerTwoScore();
      this.getElement().text = this.getScoreText();
    }
  }  
}