import 'phaser';
import jungleG from '../assets/forest/bg_jungle_layers/bg5_g.png';
import jungleF from '../assets/forest/bg_jungle_layers/bg5_f.png';
import jungleE from '../assets/forest/bg_jungle_layers/bg5_e.png';
import jungleD from '../assets/forest/bg_jungle_layers/bg5_d.png';
import jungleC from '../assets/forest/bg_jungle_layers/bg5_c.png';
import jungleB from '../assets/forest/bg_jungle_layers/bg5_b.png';
import jungleA from '../assets/forest/bg_jungle_layers/bg5_a.png';
import water from '../assets/forest/water.png';
import platformTile from '../assets/forest/jungle_pack_05.png';
import dude from '../assets/player-design/player.png';

export default class GameScene extends Phaser.Scene {
  
  constructor () {
    super('Game');
  }

  addSprite(x, y, asset) {
    console.log(x);
    var spriteAdded = this.physics.add.sprite(x, y, `${asset}`);
    return spriteAdded;
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
    this.waterGroup = this.add.group();
    do{
      let water = this.addSprite(pos, 556, 'water')
      waterArray.push(water);
      this.waterGroup.add(water);
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

  setPlatforms() {
    this.platformGroup = this.add.group();
    let pos = 0;
    let i = 0;
    do{
      let platform = this.addSprite(pos, 460, 'platform')
      platform.setImmovable(true);
      this.platformGroup.add(platform);
      i += 1;
      pos += 128
    } while(i != 3)
  }
 
  preload () {
    this.load.image('jungleG', jungleG);
    this.load.image('jungleF', jungleF);
    this.load.image('jungleE', jungleE);
    this.load.image('jungleD', jungleD);
    this.load.image('jungleC', jungleC);
    this.load.image('jungleB', jungleB);
    this.load.image('jungleA', jungleA);
    this.load.image('water', water);
    this.load.image('platform', platformTile);
    this.load.spritesheet("dude", dude, {
      frameWidth: 46,
      frameHeight: 50
    });
  }
 
  create () {
    this.setMountains();
    this.setWater();
    this.setPlatforms();
    this.player = this.physics.add.sprite(20, 300, 'dude').setDisplaySize(50, 70).setOrigin(0, 0);
    this.player.setGravityY(600);
    this.anims.create({
        key: 'idle',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 10,
    });
    
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 35 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 7 }),
      frameRate: 10,
      repeat: true,
    })
    this.player.setCollideWorldBounds(true);
    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, function(){
        if(!this.player.anims.isPlaying){
            this.player.anims.play("turn");
        }
    }, null, this);

    this.physics.add.collider(this.player, this.waterGroup, function() {
      this.scene.start('Title');
    }, null, this);
  } 

  update() {
    const cursorKey = this.input.keyboard.createCursorKeys();
    let direction = 'right';
    if (cursorKey.right.isDown) {
      this.player.flipX = direction === 'right' ? false : true;
      this.player.setVelocityX(160);
      this.player.anims.play('run', true);
      direction = 'right';
    } else if (cursorKey.left.isDown) {
      this.player.flipX = direction === 'left' ? false : true;
      this.player.setVelocityX(-160);
      this.player.anims.play('run', true);
      direction = 'left';
    } else if (cursorKey.up.down) {
      this.player.anims.play('jump', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
    if (cursorKey.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
  }
};