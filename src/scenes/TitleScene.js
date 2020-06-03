import 'phaser';
import Button from '../objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.gameButton = new Button(this, width / 2, height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');


    this.optionsButton = new Button(this, width / 2, height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');


    this.creditsButton = new Button(this, width / 2, height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('menuMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}