import { Application } from 'pixi.js';
import { GameScene } from './Scene/GameScene';
import { theme } from './theme';

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: theme.backgroundColor,
  width: 1000,
  height: 700,
  antialias: true
});

app.stage.addChild(new GameScene(app));