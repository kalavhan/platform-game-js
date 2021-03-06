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

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.gameOptions = {
      platformSpeedRange: [300, 400],
      spawnRange: [130, 270],
      platformSizeRange: [90, 200],
      platformHeightRange: [-10, 10],
      platformHeighScale: 10,
      platformVerticalLimit: [0.75, 0.8],
      playerGravity: 900,
      jumpForce: 400,
      playerStartPosition: 200,
    };
  }

  preload() {
    this.load.image('jungleG', jungleG);
    this.load.image('jungleF', jungleF);
    this.load.image('jungleE', jungleE);
    this.load.image('jungleD', jungleD);
    this.load.image('jungleC', jungleC);
    this.load.image('jungleB', jungleB);
    this.load.image('jungleA', jungleA);
    this.load.image('water', water);
    this.load.image('platform', platformTile);
  }

  create() {
    localStorage.setItem('scoreSaved', false);
    this.model = this.sys.game.globals.model;
    this.setMountains();
    this.setWater();
    this.setPlatforms();
    this.setFallingObjects();
    this.minutes = 0;
    this.seconds = 0;
    this.mls = 0;
    this.timePlayed = '';
    this.timeText = this.add.text(15, 15, null, { fontSize: '32px', fill: '#000' });
    this.jumpCount = 0;
    this.player = this.physics.add.sprite(this.gameOptions.playerStartPosition, 600 * 0.6, 'dude').setDisplaySize(60, 90);
    this.player.setSize(20, 41, true);
    this.input.enableDebug(this.player, 0xff00ff);
    this.player.setGravityY(900);
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'dude', frame: 0 }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 35 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'dude', frame: 6 }],
      frameRate: 10,
      repeat: false,
    });

    this.player.setCollideWorldBounds(true);
    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, null, null, this);

    this.physics.add.collider(this.player, this.waterGroup, function () {
      this.scene.pause();
      this.player.setTint(0xff142c);
      this.model.score = this.timePlayed;
      setTimeout(() => {
        this.scene.resume();
        this.scene.start('Over');
      }, 1200);
    }, null, this);

    this.physics.add.collider(this.player, this.fallingGroup, function () {
      this.scene.pause();
      this.player.setTint(0xff142c);
      this.model.score = this.timePlayed;
      setTimeout(() => {
        this.scene.resume();
        this.scene.start('Over');
      }, 1200);
    }, null, this);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.zone = this.add.zone(width / 2, height / 2, width, height);
    const pressText = this.add.text(0, 0, 'Press "move left" or "move right" to start the game', { fontSize: '28px', fill: '#f00' });
    Phaser.Display.Align.In.Center(
      pressText,
      this.zone,
    );
    pressText.setY(90);
    this.scene.pause();
    this.scene.launch('Pause');
    this.events.on('resume', function () {
      pressText.destroy();
    });
    if (this.model.leaderboard !== false) {
      this.model.leaderboard.remove();
      this.model.leaderboard = false;
    }
  }

  update() {
    const cursorKey = this.input.keyboard.createCursorKeys();
    let direction = 'right';
    if (cursorKey.right.isDown) {
      this.player.flipX = direction === 'left';
      if (this.player.body.touching.down) {
        this.player.anims.play('run', true);
        this.player.setVelocityX(400);
      } else {
        this.player.anims.play('jump', true);
        this.player.setVelocityX(200);
      }
      direction = 'right';
    } else if (cursorKey.left.isDown) {
      this.player.flipX = direction === 'right';
      this.player.setVelocityX(-400);
      if (this.player.body.touching.down) {
        this.player.anims.play('run', true);
        this.player.setVelocityX(-400);
      } else {
        this.player.anims.play('jump', true);
        this.player.setVelocityX(-350);
      }
      direction = 'left';
    } else if (cursorKey.up.down) {
      this.player.anims.play('jump', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
    if (cursorKey.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-430);
    }
    let minDistance = 800;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = 800 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        this.gameOptions.platformSizeRange[0], this.gameOptions.platformSizeRange[1],
      );
      const platformRandomHeight = this.gameOptions.platformHeighScale * Phaser.Math.Between(
        this.gameOptions.platformHeightRange[0], this.gameOptions.platformHeightRange[1],
      );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap, minPlatformHeight, maxPlatformHeight,
      );
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2, nextPlatformHeight);
    }
    this.fallingGroup.getChildren().forEach(function (falling) {
      if (falling.y > 600) {
        this.fallingGroup.killAndHide(falling);
        this.fallingGroup.remove(falling);
      }
    }, this);

    this.chronometer();
  }

  setFallingObjects() {
    this.fallingGroup = this.add.group();
    this.addFallingObject();
  }

  addFallingObject() {
    const x = Phaser.Math.Between(20, 780);
    const falling = this.physics.add.sprite(x, -50, 'rock').setDisplaySize(30, 40);
    falling.setImmovable(true);
    falling.setVelocityY(Phaser.Math.Between(100, 200));
    this.fallingGroup.add(falling);
  }

  chronometer() {
    if (this.mls > 59) {
      this.seconds += 1;
      this.mls = 0;
      this.addFallingObject();
      if (this.seconds > 59) {
        this.minutes += 1;
      }
    } else {
      this.mls += 1;
    }
    const dm = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    const ds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    this.timeText.setText(`${dm}:${ds}`);
    this.timePlayed = `${dm}:${ds}`;
  }

  addSprite(x, y, asset, depth = 1) {
    const spriteAdded = this.physics.add.sprite(x, y, `${asset}`);
    spriteAdded.depth = depth;
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
    const waterArray = [];
    this.waterGroup = this.add.group();
    do {
      const water = this.addSprite(pos, 586, 'water', 3).setInteractive();
      water.setSize(128, 30, true);
      waterArray.push(water);
      this.waterGroup.add(water);
      i += 1;
      pos += 128;
    } while (i !== 8);
    this.tweens.add({
      targets: waterArray,
      x: '-=128',
      duration: 4500,
      ease: 'Power5',
      repeat: -1,
    });
  }

  setPlatforms() {
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });
    this.platformPool = this.add.group({
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });
    this.addPlatform(800, 800 / 2, 600 * this.gameOptions.platformVerticalLimit[1]);
  }

  addPlatform(platformWidth, posX, posY) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, posY, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(Phaser.Math.Between(
        this.gameOptions.platformSpeedRange[0], this.gameOptions.platformSpeedRange[1],
      ) * -1);
      this.platformGroup.add(platform);
    }
    platform.displayHeight = 30;
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      this.gameOptions.spawnRange[0], this.gameOptions.spawnRange[1],
    );
  }
}