import 'phaser';
import cokecan from '../assets/cokecan.png';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene');
  }
 
  preload () {
    this.load.image('cokecan', `${cokecan}`);
  }
 
  create () {
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#FFF' });
    this.add.image(100, 200, 'cokecan');
  }
};