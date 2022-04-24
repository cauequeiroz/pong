import { Container } from "pixi.js";

export class GameScene extends Container {
  private screenWidth: number;
  private screenHeight: number;

  constructor(screenWidth: number, screenHeight: number) {
    super();
    
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    console.log(this.screenWidth, this.screenHeight);
  }
}