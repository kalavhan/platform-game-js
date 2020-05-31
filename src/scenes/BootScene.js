import 'phaser';
import logo from '../assets/cokecan.png';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', logo);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};