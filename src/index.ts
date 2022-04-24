import { Application } from 'pixi.js';
import { GameScene } from './GameScene';

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xffffff,
  width: 1000,
  height: 700,
  antialias: true
});

const gameScene = new GameScene(app.screen.width, app.screen.height);

app.stage.addChild(gameScene);