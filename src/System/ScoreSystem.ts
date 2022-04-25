export class ScoreSystem {
  private playerOneScore: number;
  private playerTwoScore: number;

  constructor() {
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
  }

  public getPlayerOneScore(): number {
    return this.playerOneScore;
  }

  public getPlayerTwoScore(): number {
    return this.playerTwoScore;
  }

  public upPlayerOneScore() {
    this.playerOneScore += 1;
  }

  public upPlayerTwoScore() {
    this.playerTwoScore += 1;
  }
}