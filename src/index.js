import 'phaser';

import { MainScene } from './scenes/main-scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: MainScene
};

new Phaser.Game(gameConfig);
