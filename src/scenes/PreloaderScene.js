import 'phaser';
import buttonTwo from '../assets/ui/blue_button02.png';
import buttonThree from '../assets/ui/blue_button03.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import box from '../assets/ui/grey_box.png';
import playGameMusic from '../assets/audio/pgame-music.mp3';
import rock from '../assets/rock.png';
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

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('blueButton1', buttonTwo);
    this.load.image('blueButton2', buttonThree);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.image('rock', rock);
    this.load.audio('playGameMusic', [playGameMusic]);
    this.load.image('jungleG', jungleG);
    this.load.image('jungleF', jungleF);
    this.load.image('jungleE', jungleE);
    this.load.image('jungleD', jungleD);
    this.load.image('jungleC', jungleC);
    this.load.image('jungleB', jungleB);
    this.load.image('jungleA', jungleA);
    this.load.image('water', water);
    this.load.image('platform', platformTile);
    this.load.spritesheet('dude', dude, {
      frameWidth: 46,
      frameHeight: 50,
    });
  }

  create() {
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Over');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Over');
    }
  }
}