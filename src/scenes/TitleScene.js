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
  }
}