import cokecan from '../assets/cokecan.png';
export class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', `${cokecan}`);
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0F0' });
    this.add.image(100, 200, 'cokecan');
  }
}
