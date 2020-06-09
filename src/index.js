import 'phaser';
import './css/main.css';
import arrows from './assets/arrows.png';
import config from './modules/PhaserConfig';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import CreditsScene from './scenes/CreditsScene';
import OptionsScene from './scenes/OptionsScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import GameOverScene from './scenes/GameOverScene';
import Model from './scenes/Model';
import scoreBoard from './modules/ScoreBoard';
import InputScene from './scenes/InputScene';
import PauseScene from './scenes/PauseScene';

document.getElementById('arrowsImg').src = arrows;
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    const sB = new scoreBoard();
    this.globals = { model, bgMusic: null, sB };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Input', InputScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Over', GameOverScene);
    this.scene.add('Pause', PauseScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Preloader');
  }
}

window.game = new Game();
