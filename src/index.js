import 'phaser';
import PhaserConfig from './modules/PhaserConfig';

class Game extends Phaser.Game {
  constructor (){
    super(PhaserConfig);
    this.scene.start('GameScene');
  }
}

window.game = new Game();
