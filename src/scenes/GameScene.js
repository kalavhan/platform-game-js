import 'phaser';
import jungleG from '../assets/forest/bg_jungle_layers/bg5_g.png';
import jungleF from '../assets/forest/bg_jungle_layers/bg5_f.png';
import jungleE from '../assets/forest/bg_jungle_layers/bg5_e.png';
import jungleD from '../assets/forest/bg_jungle_layers/bg5_d.png';
import jungleC from '../assets/forest/bg_jungle_layers/bg5_c.png';
import jungleB from '../assets/forest/bg_jungle_layers/bg5_b.png';
import jungleA from '../assets/forest/bg_jungle_layers/bg5_a.png';
import water from '../assets/forest/water.png';

const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2
}

export default class GameScene extends Phaser.Scene {
  
  constructor () {
    super('GameScene');
  }

  addImage(x, y, asset) {
    console.log(x);
    var imageAdded = this.add.image(x, y, `${asset}`);
    return imageAdded;
  }

  setMountains() {
    this.add.image(0, 0, 'jungleG').setDisplaySize(800, 600).setOrigin(0, 0);
    this.add.image(0, 100, 'jungleF').setDisplaySize(800, 100).setOrigin(0, 0);
    this.add.image(0, 200, 'jungleE').setDisplaySize(800, 400).setOrigin(0, 0);
    this.add.image(0, 250, 'jungleD').setDisplaySize(800, 400).setOrigin(0, 0);
    this.add.image(0, 300, 'jungleC').setDisplaySize(800, 400).setOrigin(0, 0);
    this.add.image(0, 305, 'jungleB').setDisplaySize(800, 400).setOrigin(0, 0);
    this.add.image(0, 340, 'jungleA').setDisplaySize(800, 400).setOrigin(0, 0);
  }

  setWater() {
    let i = 0;
    let pos = 64;
    let waterArray = [];
    do{
      waterArray.push(this.addImage(pos, 556, 'water'));
      i += 1;
      pos += 128
    } while(i != 8)
    this.tweens.add({
      targets: waterArray,
      x: '-=128',
      duration: 2500,
      ease: 'Power5',
      repeat: -1
    });
  }
 
  preload () {
    this.load.image('jungleG', `${jungleG}`);
    this.load.image('jungleF', `${jungleF}`);
    this.load.image('jungleE', `${jungleE}`);
    this.load.image('jungleD', `${jungleD}`);
    this.load.image('jungleC', `${jungleC}`);
    this.load.image('jungleB', `${jungleB}`);
    this.load.image('jungleA', `${jungleA}`);
    this.load.image('water', water);
  }
 
  create () {
    this.setMountains();
    this.setWater();
  }
};