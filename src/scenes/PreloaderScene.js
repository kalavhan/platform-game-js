import 'phaser';
import logo from '../assets/logo.png';
import buttonTwo from '../assets/ui/blue_button02.png';
import buttonThree from '../assets/ui/blue_button03.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import box from '../assets/ui/grey_box.png';
import menuMusic from '../assets/audio/menu-music.mp3';
import playGameMusic from '../assets/audio/playgame-music.mp3';
import hitSound from '../assets/audio/hit-sound.mp3';
import powerUpSound from '../assets/audio/powerUp-sound.mp3';
import powerDownSound from '../assets/audio/powerDown-sound.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
      // add logo image
    this.add.image(400, 200, 'logo');
  
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
  
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
  
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
  
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
  
    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
  
    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
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
    this.load.image('phaserLogo', logo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.audio('menuMusic', [menuMusic]);
    this.load.audio('playGameMusic', [playGameMusic]);
    this.load.audio('hitSound', [hitSound]);
    this.load.audio('powerUpSound', [powerUpSound]);
    this.load.audio('powerDownSound', [powerDownSound]);
  }
 
  create () {
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {	
    this.scene.start('Game');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Game');
    }
  }
};