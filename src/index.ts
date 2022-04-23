import { Application } from 'pixi.js';
import { Scene } from './Scene';

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xffffff,
  width: 1000,
  height: 700
});

const gameScene = new Scene(app.screen.width, app.screen.height);

app.stage.addChild(gameScene);